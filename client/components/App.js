import React, { Component } from "react";
import { useAuth } from "../auth.js";

import Authenticated from "./Authenticated.js";
import Unauthenticated from "./Unauthenticated.js";

export default function App() {
  let { user, isLoading } = useAuth();
  if (isLoading) {
    return null;
  } else {
    if (user.id) {
      return <Authenticated />;
    }
    return <Unauthenticated />;
  }
}
