import { isRedirectError } from "next/dist/client/components/redirect-error";

// Sign in the user with credentials
export async function signInWithCredentials(prevState, formData) {
  try {
    // potentially added when backend is finished
    // const user = signInFormSchema.parse({
    //   email: formData.get("email"),
    //   password: formData.get("password"),
    // });

    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(`Signed in user with an email of: ${user.email}`);

    // potentially added when backend is finished
    // await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
}

// Sign user out
export async function signOutUser() {
  // potentially added
  //   await signOut();
  console.log("User was signed out");
}

// Sign up user
export async function signUpUser(prevState, formData) {
  try {
    // potentially added
    // const user = signUpFormSchema.parse({
    //   name: formData.get("name"),
    //   email: formData.get("email"),
    //   password: formData.get("password"),
    //   confirmPassword: formData.get("confirmPassword"),
    // });

    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    console.log(`User was signed up successfully: ${JSON.stringify(user)}`);

    // const plainPassword = user.password;

    // user.password = hashSync(user.password, 10);

    // await prisma.user.create({
    //   data: {
    //     name: user.name,
    //     email: user.email,
    //     password: user.password,
    //   },
    // });

    // await signIn("credentials", {
    //   email: user.email,
    //   password: plainPassword,
    // });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: `Failed to sign up: ${error}` };
  }
}
