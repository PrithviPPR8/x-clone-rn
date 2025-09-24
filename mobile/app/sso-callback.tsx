import { Redirect } from "expo-router";

export default function SSOCallback() {
  // Immediately redirect to tabs home after SSO finishes
  return <Redirect href="/(tabs)" />;
}