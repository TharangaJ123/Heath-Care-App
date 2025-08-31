import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { MedicationProvider } from "@/contexts/MedicationContext";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <ProfileProvider>
                <MedicationProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="splash" />
                        <Stack.Screen name="(onboarding)" />
                        <Stack.Screen name="(tabs)" />
                    </Stack>
                </MedicationProvider>
            </ProfileProvider>
        </ThemeProvider>
    )
}
