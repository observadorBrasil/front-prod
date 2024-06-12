import React from 'react';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserActions } from "../src/store/slices/user";

function LogoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserActions.logoutUser());
    router.push("/login");
  }, [router, dispatch]);

  return null;
}

export default LogoutPage;
