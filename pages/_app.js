import "../styles/globals.css";
import { RestaurantProvider } from "../context/RestaurantContext/RestaurantContext";
import AuthContext from "../context/AuthContext";
import Amplify from "aws-amplify";
import awsconfig from "../src/aws-exports";
import { initializeIcons } from "@fluentui/react";

Amplify.configure({
  ...awsconfig,
  ssr: true,
});

initializeIcons();

function MyApp({ Component, pageProps }) {
  return (
    <AuthContext>
      <RestaurantProvider>
        <Component {...pageProps} />
      </RestaurantProvider>
    </AuthContext>
  );
}

export default MyApp;
