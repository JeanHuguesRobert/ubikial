
import { useState } from "react";
import { Credential } from "@/types/social";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CredentialsListProps {
  credentials: Credential[];
  onCredentialUpdate?: (updatedCredential: Credential) => void;
}

export const CredentialsList = ({ credentials, onCredentialUpdate }: CredentialsListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Credential>>({});
  const { toast } = useToast();

  const handleEdit = (credential: Credential) => {
    setEditingId(credential.id);
    setEditForm(credential);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (id: string) => {
    if (!editForm.username || !editForm.profileUrl) {
      toast({
        title: "Error",
        description: "Username and profile URL are required",
        variant: "destructive"
      });
      return;
    }

    const updatedCredential = {
      ...credentials.find(cred => cred.id === id)!,
      ...editForm
    };

    if (onCredentialUpdate) {
      onCredentialUpdate(updatedCredential);
    }

    toast({
      title: "Success",
      description: "Credential updated successfully"
    });

    setEditingId(null);
    setEditForm({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Credentials</CardTitle>
        <CardDescription>Manage your social media accounts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {credentials.map(credential => (
          <div key={credential.id} className="border rounded-md p-4">
            {editingId === credential.id ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="network">Network</Label>
                  <div className="text-lg font-semibold capitalize">{credential.network}</div>
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username"
                    name="username"
                    value={editForm.username || ''}
                    onChange={handleChange}
                    placeholder="Username"
                  />
                </div>
                <div>
                  <Label htmlFor="profileUrl">Profile URL</Label>
                  <Input 
                    id="profileUrl"
                    name="profileUrl"
                    value={editForm.profileUrl || ''}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button 
                    size="sm" 
                    onClick={() => handleSave(credential.id)}
                    className="flex items-center"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleCancel}
                    className="flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold capitalize">{credential.network}</h3>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleEdit(credential)}
                    className="flex items-center"
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <p className="mt-2">Username: {credential.username}</p>
                <p>Profile URL: {credential.profileUrl}</p>
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
