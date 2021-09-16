import React from "react";
import { useApiFetch } from "util/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage(props) {
  const { error, isLoading, response } = useApiFetch("/sample");

  return (
    <main>
      {error && <h3 style={{ color: "red" }}>Error Loading Data: {error}</h3>}
      {isLoading && <LoadingSpinner></LoadingSpinner>}
      {!error && response && (
        <div>
          Username: {response.username}{" "}
          <button class="btn" id="logout">
            Log Out
          </button>
        </div>
      )}
      <h1>Welcome to GameTrak!</h1>
      <button>Login</button> <button>Sign Up</button>
    </main>
  );
}
