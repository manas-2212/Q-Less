"use client";

import { useEffect } from "react";
import { getRoleFromToken } from "../../lib/auth";

export default function OAuthSuccessPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    localStorage.setItem("token", token)
    const role = getRoleFromToken(token)

    if (role === "BUSINESS") {
      window.location.href ="/dashboard/business"
    }else{
      window.location.href= "/dashboard/customer"
    }
  }, []);

  return null;
}
