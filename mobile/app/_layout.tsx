import { Stack } from "expo-router";
import "../global.css";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { StripeProvider } from "@stripe/stripe-react-native";

// Initialize the Query Client without Sentry error logging
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any, query) => {
      // You can replace this with a simple console.error for local debugging
      console.error(`Query Error [${query.queryKey[0]}]:`, error.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      console.error("Mutation Error:", error.message);
    },
  }),
});

export default function RootLayout() {
  return (
    <ClerkProvider 
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!} 
      tokenCache={tokenCache}
    >
      <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </ClerkProvider>
  );
}