import React from "react";
import "./signUpSuccessPage.scss";

export default function SignUpSuccessPage() {
  return (
    <div className="signUpSuccessCont">
      <div className="signUpSuccessWrap">
        <div className="successContent">
          <h1>Congratulations...🎆🎉🎇</h1>
          <p>
            Your sign-up was successful, and a confirmation message has been
            sent to your email.
          </p>
          <p>Kindly visit your email to verify your account.</p>
        </div>
      </div>
    </div>
  );
}
