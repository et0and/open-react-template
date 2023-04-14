export const metadata = {
  title: 'Sign Up - Arvault',
  description: 'Create an account to use Arvault',
}

import { useState } from "react";
import Link from "next/link";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const signUpWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing up with Google: ", error);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fullName = e.currentTarget.elements.namedItem("fullName") as HTMLInputElement;
    const companyName = e.currentTarget.elements.namedItem("companyName") as HTMLInputElement;
    const email = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const password = e.currentTarget.elements.namedItem("password") as HTMLInputElement;  

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Add user details to Firestore, etc.
    } catch (error) {
      console.error("Error signing up with email: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Create an account</h1>
          </div>

          <div className="max-w-sm mx-auto">
            <form>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <button
                    onClick={signUpWithGoogle}
                    className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
                  >
                    <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                    </svg>
                    <span className="h-6 flex items-center border-r border-white border-opacity-25 mr-4" aria-hidden="true"></span>
                    <span className="flex-auto pl-16 pr-8 -ml-16">Sign up with Google</span>
                  </button>
                </div>
              </div>
            </form>
            <div className="flex items-center my-6">
              <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
<div className="text-gray-400">Or, register with your email</div>
<div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
</div>
<form onSubmit={signUpWithEmail}>
<div className="flex flex-wrap -mx-3 mb-4">
<div className="w-full px-3">
<label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="full-name">Full Name <span className="text-red-600"></span></label>
<input id="full-name" name="fullName" type="text" className="form-input w-full text-gray-300" placeholder="First and last name" required />
</div>
</div>
<div className="flex flex-wrap -mx-3 mb-4">
<div className="w-full px-3">
<label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="company-name">Company Name <span className="text-red-600"></span></label>
<input id="company-name" name="companyName" type="text" className="form-input w-full text-gray-300" placeholder="Your company or app name" required />
</div>
</div>
<div className="flex flex-wrap -mx-3 mb-4">
<div className="w-full px-3">
<label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Work Email <span className="text-red-600"></span></label>
<input id="email" name="email" type="email" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" required />
</div>
</div>
<div className="flex flex-wrap -mx-3 mb-4">
<div className="w-full px-3">
<label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600"></span></label>
<input id="password" name="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
</div>
</div>
<div className="text-sm text-gray-500 text-center">
I agree to the Arvault <Link href="#" className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
</div>
<div className="flex flex-wrap -mx-3 mt-6">
<div className="w-full px-3">
<button
                 type="submit"
                 className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                 disabled={loading}
               >
Sign up
</button>
</div>
</div>
</form>
<div className="text-gray-400 text-center mt-6">
Already using Arvault? <Link href="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</Link>
</div>
</div>
</div>
</div>
</section>
);
}
