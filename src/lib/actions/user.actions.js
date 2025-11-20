"use server";

import { auth, signIn, signOut } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

// sign up
export async function signUpUser(prevState, formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: {
        username: name,
        email,
        password_hash: hashedPassword,
        created_at: new Date(),
      },
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Sign up error:", error);
    return { success: false, message: "Registration failed." };
  }
  redirect("/sign-in");
}

// sign in
export async function signInWithCredentials(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    await signIn("credentials", {
      email,
      password: password,
      redirect: false,
    });

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error.type === "CredentialsSignin" || error.code === "credentials") {
      return { success: false, message: "Invalid email or password" };
    }

    return { success: false, message: "Something went wrong." };
  }
}

// delete account
export async function deleteUserAccount() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return { success: false, message: "Not authenticated" };
    }

    await prisma.users.delete({
      where: {
        id: parseInt(session.user.id),
      },
    });

    return { success: true, message: "Account deleted successfully" };
  } catch (error) {
    console.error("Delete account error: ", error);
    return { success: false, message: "Failed to delete account" };
  }
}

// update the user profile
export async function updateUserProfile(formData) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return { success: false, message: "Not authenticated" };
    }

    const name = formData.get("name");
    const password = formData.get("password");

    const updateData = {
      username: name,
    };

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password_hash = hashedPassword;
    }

    await prisma.users.update({
      where: { id: parseInt(session.user.id) },
      data: updateData,
    });

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Update profile error:", error);
    return { success: false, message: "Failed to update profile" };
  }
}
