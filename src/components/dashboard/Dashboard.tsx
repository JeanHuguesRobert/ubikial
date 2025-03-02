
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Credential, Post, Persona } from "@/types/social";
import { useUser } from "@clerk/clerk-react";
import { CreatePostForm } from "@/components/post/CreatePostForm";
import { PostsList } from "@/components/post/PostsList";
import { CredentialsList } from "@/components/credential/CredentialsList";
import { CreatePersonaDialog } from "@/components/persona/CreatePersonaDialog";
import { PersonasList } from "@/components/persona/PersonasList";
import { useToast } from "@/components/ui/use-toast";

export const Dashboard = () => {
  const { user } = useUser();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Mock data for demonstration
    const mockCredentials: Credential[] = [
      {
        id: "1",
        network: "twitter",
        username: "@testuser",
        profileUrl: "https://twitter.com/testuser",
        apiKey: "testapikey",
        personaIds: [],
      },
      {
        id: "2",
        network: "linkedin",
        username: "testuser",
        profileUrl: "https://linkedin.com/in/testuser",
        apiKey: "testapikey",
        personaIds: [],
      },
    ];
    setCredentials(mockCredentials);

    const mockPosts: Post[] = [
      {
        id: "101",
        network: "twitter",
        content: "Check out my new blog post!",
        date: new Date().toLocaleDateString(),
        engagement: 150,
        personaId: "1",
      },
      {
        id: "102",
        network: "linkedin",
        content: "Excited to share my insights on...",
        date: new Date().toLocaleDateString(),
        engagement: 210,
        personaId: "2",
      },
    ];
    setPosts(mockPosts);

    // Mock personas
    const mockPersonas: Persona[] = [
      {
        id: "1",
        name: "Professional",
        description: "For work-related content",
      }
    ];
    setPersonas(mockPersonas);
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleCredentialUpdate = (updatedCredential: Credential) => {
    setCredentials(prevCredentials => 
      prevCredentials.map(cred => 
        cred.id === updatedCredential.id ? updatedCredential : cred
      )
    );
    toast({
      title: "Credential Updated",
      description: `${updatedCredential.network} credential has been updated.`
    });
  };

  const handlePersonaCreated = (newPersona: Persona) => {
    setPersonas(prevPersonas => [...prevPersonas, newPersona]);
  };

  const handleDeletePersona = (personaId: string) => {
    // Remove persona
    setPersonas(prevPersonas => prevPersonas.filter(p => p.id !== personaId));
    
    // Update credentials to remove this persona ID
    setCredentials(prevCredentials => 
      prevCredentials.map(cred => ({
        ...cred,
        personaIds: cred.personaIds.filter(id => id !== personaId)
      }))
    );
    
    toast({
      title: "Persona Deleted",
      description: "The persona has been deleted successfully."
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.firstName || 'User'}</h1>
          <p className="text-gray-600 mt-1">Manage your social media presence</p>
        </div>
        <CreatePersonaDialog onPersonaCreated={handlePersonaCreated} />
      </div>
      <Tabs defaultValue="posts" className="w-full">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
          <TabsTrigger value="personas">Personas</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <CreatePostForm onPostCreated={handlePostCreated} />
          <PostsList posts={posts} />
        </TabsContent>
        <TabsContent value="credentials">
          <CredentialsList 
            credentials={credentials} 
            onCredentialUpdate={handleCredentialUpdate} 
          />
        </TabsContent>
        <TabsContent value="personas">
          <PersonasList 
            personas={personas} 
            credentials={credentials}
            onDeletePersona={handleDeletePersona}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};
