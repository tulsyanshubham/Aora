import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

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
            config.videoCollectionId
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
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

const searchPosts = async (query) => {
    try {
        const posts = await database.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search('title', query)]
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

export { createUser, signin, getCurrentUser, getAllPosts, getLatestPosts, searchPosts, getUsersPosts, signOut }