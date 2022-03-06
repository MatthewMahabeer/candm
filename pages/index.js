import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Label, Pivot, PivotItem, Text } from "@fluentui/react";
import { Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import RestaurantPivot from "../components/Restaurant/RestaurantPivot";
import RestaurantHome from "../components/Restaurant/RestaurantHome";
import { useUser } from "../context/AuthContext";

export default function Home() {
  const { user } = useUser();

  if (!user || user.isLoggedIn === false) {
    return (
      <div className="mt-52 text-center content-center justify-center align-middle">
        <Text>You need to Log in</Text>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>{"<3"}</title>
      </Head>
      <div className="fixed top-4 right-4">
        <Persona text={user?.attributes?.name} size={PersonaSize.size24} />
      </div>
      <div className="mt-2 ml-2">
        <Pivot>
          <PivotItem headerText="Restaurants">
            <RestaurantPivot />
          </PivotItem>
          <PivotItem headerText="Hotels">
            <Label>Hotels not yet implemented..</Label>
          </PivotItem>
          <PivotItem headerText="Beaches">
            <Label>[[[]]] not yet implemented..</Label>
          </PivotItem>
          <PivotItem headerText="Rivers/Tourist Attractions">
            <Label>[[[]]] not yet implemented..</Label>
          </PivotItem>
        </Pivot>
      </div>
    </div>
  );
}
