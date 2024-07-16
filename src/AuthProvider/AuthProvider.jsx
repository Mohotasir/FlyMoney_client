

import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GithubAuthProvider, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/axiospublic/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateProfiles = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const signInWithGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, gitHubProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            //console.log("Auth state changed:", currentUser);
            setUser(currentUser);
            if(currentUser){
                const userInfo = {email : currentUser.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })
                
            }else{
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = { user, loading, createUser, signInUser, signInWithGoogle, signInWithGithub, logOut, updateProfiles };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;