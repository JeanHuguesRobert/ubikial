
import { Credential } from "@/types/social";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CredentialsListProps {
  credentials: Credential[];
}

export const CredentialsList = ({ credentials }: CredentialsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Credentials</CardTitle>
        <CardDescription>Manage your social media accounts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {credentials.map(credential => (
          <div key={credential.id} className="border rounded-md p-4">
            <h3 className="text-lg font-semibold">{credential.network}</h3>
            <p>Username: {credential.username}</p>
            <p>Profile URL: {credential.profileUrl}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
