import { login, signup } from "./actions";

export default function Auth() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input required id="email" name="email" type="email" />
      <label htmlFor="password">Password:</label>
      <input required id="password" name="password" type="password" />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
