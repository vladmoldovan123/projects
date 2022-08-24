
    import { initializeApp } from "firebase/app";
    import { getStorage } from "firebase/storage";

    const firebaseConfig = {
        apiKey: "AIzaSyBHimBv0ZgcKVNJW_F3kr6Pdlp4jA0syLk",
        authDomain: "fir-react-storage-3d2a4.firebaseapp.com",
        projectId: "fir-react-storage-3d2a4",
        storageBucket: "fir-react-storage-3d2a4.appspot.com",
        messagingSenderId: "284855117925",
        appId: "1:284855117925:web:556567d17b6dc8d95d7e8c"
    };

    export const app = initializeApp(firebaseConfig);
    export const storage = getStorage(app);