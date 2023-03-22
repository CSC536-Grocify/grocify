import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUsername, selectCurrentEmail, selectCurrentTokens } from "../../../features/auth/authSlice";

function TagsPannel() {
  const username = useSelector(selectCurrentUsername);
  const email = useSelector(selectCurrentEmail);
  const tokens = useSelector(selectCurrentTokens);

  const accessToken = tokens && tokens.access.substring(0, 10);
  const truncatedAccessToken = accessToken && accessToken.substring(0, 10);

  return (
    <div>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Access tokens: {truncatedAccessToken}</p>
    </div>
  )
}

export default TagsPannel;
