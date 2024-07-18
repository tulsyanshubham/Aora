import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.shubham.aora",
    projectId: "66373ea10025739374c5",
    databaseId: "663741ef00114bdf5eef",
    userCollectionId: "66374230001af0f14e08",
    videoCollectionId: "663742ad001162d3c251",
    storageId: "663744e90022005fd9da"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

const createUser = async (username, email, password) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);
        await signin(email, password);

        const newUser = await database.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                username,
                email,
                avatar: avatarUrl
            }
        )
        return newUser;
    } catch (error) {
        console.log(error.message)
        throw new Error(error);
    }
}

const signin = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session
    } catch (error) {
        console.log(error.message)
        throw new Error(error);
    }
}

const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        // console.log(currentAccount)
        if (!currentAccount) throw Error;

        const currentUser = await database.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        // console.log(currentUser)
        return currentUser;
    } catch (error) {
        console.log(error.message)
    }
}

const getAllPosts = async () => {
    try {
        const posts = await database.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

const getLatestPosts = async () => {
    try {
        const posts = await database.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        // console.log(posts.documents[11].tag)
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

const searchPosts = async (query) => {
    type = query[0]==='#' ? 'tag' : 'title';
    try {
        const posts = await database.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search(type, query)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

const getUsersPosts = async (userId) => {
    try {
        // console.log(userId)
        const posts = await database.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal("creator", userId)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

const signOut = async () => {
    try {
        await account.deleteSession('current');
        // return session;
    } catch (error) {
        throw new Error(error)
    }
}

const getFilePreview = async (fileId, type) => {
    let fileUrl;
    try {
        if (type === "video") {
            fileUrl = storage.getFileView(config.storageId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFileView(
                config.storageId,
                fileId,
                2000, //width
                2000, //height
                "top", //gravity
                100 //quality
            );
        } else {
            throw new Error("Imvalid file type")
        }
        if (!fileUrl) throw new Error;

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

const uploadFile = async (file, type) => {
    if (!file) return;
    // console.log(file)
    const asset = {
        name : file.fileName,
        type : file.mimeType,
        size : file.filesize,
        uri : file.uri,
    };

    try {
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        );
        // console.log(uploadFile)

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

const createVideoPost = async (form) => {
    try {
        // console.log(form.video,form.thumbnail)
        const tagres = await fetch('https://keyword-extract.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: form.prompt})
        });
        const tagresult = await tagres.json();
        const tags = JSON.stringify(tagresult.result);

        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video"),
        ]);

        const newPost = await database.createDocument(
            config.databaseId,
            config.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
                tag: tags,
            }
        );

        return newPost;
    } catch (error) {
        throw new Error(error);
    }
}

export { createUser, signin, getCurrentUser, getAllPosts, getLatestPosts, searchPosts, getUsersPosts, signOut, createVideoPost, uploadFile, getFilePreview }