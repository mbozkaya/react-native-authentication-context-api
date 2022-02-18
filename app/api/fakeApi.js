import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (time) => new Promise((res) => setTimeout(res, time));

const storageKeys = {
    allUsers: '@allUsers',
    currentUser: '@currentUser',
};

const getItemByKey = async (key) => {
    let value;
    try {
        value = await AsyncStorage.getItem(key);
        value = JSON.parse(value || '[]');
    } catch (e) {
        // TODO saving error

        return null;
    }
    return value;
}

const setItem = (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

export default {
    login: async (email, password) => {
        const allUsers = await getItemByKey(storageKeys.allUsers);
        const userIndex = allUsers.findIndex((user) => user.email === email && user.password === password);

        await wait(500);

        if (userIndex > -1) {
            setItem(storageKeys.allUsers, allUsers);
            setItem(storageKeys.currentUser, allUsers[userIndex]);

            return {
                success: true,
                user: allUsers[userIndex],
            };
        }

        return {
            success: false,
        };

    },
    register: async (email, password) => {
        const allUsers = await getItemByKey(storageKeys.allUsers);

        await wait(500);

        if (allUsers.find((user) => user.email === email)) {
            return {
                success: false,
                message: 'This email used by another user',
            };
        }

        allUsers.push({
            email,
            password
        });

        setItem(storageKeys.allUsers, allUsers);

        return {
            success: true,
        };
    },
    checkAuth: async () => {
        const currentUser = await getItemByKey(storageKeys.currentUser);
        await wait(500);
        return !currentUser;
    },
    logout: async () => {
        try {
            await wait(500);
            AsyncStorage.removeItem(storageKeys.currentUser);
        } catch (e) {
            // TODO saving error
        }
    },
};
