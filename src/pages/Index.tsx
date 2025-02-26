
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Linkedin, Twitter, Github, Link, Edit2, Save, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { SocialNetwork, Credential, Post, Persona, NETWORK_API_DOCS } from "@/types/social";

const mockPosts: Post[] = [
  {
    id: "1",
    network: "twitter",
    content: "Excited to share my latest project on cross-platform social media management!",
    date: "2024-02-20",
    engagement: 42,
    personaId: "1",
  },
  {
    id: "2",
    network: "linkedin",
    content: "New article about improving social media presence for tech professionals",
    date: "2024-02-19",
    engagement: 156,
    personaId: "1",
  },
];

const mockCredentials: Credential[] = [
  {
    id: "1",
    network: "twitter",
    username: "@jeanhugues",
    profileUrl: "https://twitter.com/jeanhugues",
    apiKey: "secret-key-1",
    personaIds: ["1"],
  },
  {
    id: "2",
    network: "linkedin",
    username: "jeanhugues",
    profileUrl: "https://linkedin.com/in/jeanhugues",
    apiKey: "secret-key-2",
    personaIds: ["1"],
  },
];

const NetworkIcon = ({ network }: { network: SocialNetwork }) => {
  const icons = {
    facebook: Facebook,
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github,
    generic: Link,
  };
  const Icon = icons[network];
  return <Icon className="h-5 w-5" />;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<"feed" | "credentials">("feed");
  const [credentials, setCredentials] = useState<Credential[]>(mockCredentials);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCredential, setEditingCredential] = useState<Partial<Credential> | null>(null);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const { toast } = useToast();
  const isOwner = true; // This should come from your auth system

  // Auto-discover personas from usernames
  useEffect(() => {
    const discoveredPersonas = new Map<string, Persona>();
    
    credentials.forEach(cred => {
      const name = cred.username.replace(/^@/, '').split(/[._]/)[0];
      if (!discoveredPersonas.has(name)) {
        discoveredPersonas.set(name, {
          id: name,
          name: name,
          description: `Persona discovered from ${cred.network}`,
        });
      }
    });

    setPersonas(Array.from(discoveredPersonas.values()));
  }, [credentials]);

  const handleEdit = (id: string) => {
    const credential = credentials.find(c => c.id === id);
    if (credential) {
      setEditingCredential({ ...credential });
      setEditingId(id);
    }
  };

  const handleSave = (id: string) => {
    if (editingCredential) {
      setCredentials(prev =>
        prev.map(cred =>
          cred.id === id ? { ...cred, ...editingCredential } as Credential : cred
        )
      );
      setEditingId(null);
      setEditingCredential(null);
      toast({
        title: "Credentials updated",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const handleInputChange = (field: keyof Credential, value: string) => {
    if (editingCredential) {
      setEditingCredential(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handlePersonaToggle = (credentialId: string, personaId: string) => {
    setCredentials(prev =>
      prev.map(cred => {
        if (cred.id === credentialId) {
          const personaIds = cred.personaIds || [];
          const updatedPersonaIds = personaIds.includes(personaId)
            ? personaIds.filter(id => id !== personaId)
            : [...personaIds, personaId];
          return { ...cred, personaIds: updatedPersonaIds };
        }
        return cred;
      })
    );
  };

  const handleAdd = () => {
    const newCred: Credential = {
      id: `new-${Date.now()}`,
      network: "twitter",
      username: "",
      profileUrl: "",
      apiKey: "",
      personaIds: [],
    };
    setCredentials(prev => [...prev, newCred]);
    setEditingCredential(newCred);
    setEditingId(newCred.id);
  };

  const networks: SocialNetwork[] = ["twitter", "facebook", "linkedin", "github", "generic"];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, Jean Hugues</h1>
            <p className="text-gray-600 mt-1">Manage your social media presence</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setActiveTab(activeTab === "feed" ? "credentials" : "feed")}
              className="slide-up"
            >
              {activeTab === "feed" ? "View Credentials" : "View Feed"}
            </Button>
            {activeTab === "credentials" && isOwner && (
              <Button
                onClick={handleAdd}
                className="slide-up bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            )}
          </div>
        </div>

        {activeTab === "feed" && (
          <div className="grid gap-6">
            {mockPosts.map((post) => (
              <Card key={post.id} className="glass-card slide-up overflow-hidden">
                <CardHeader className="flex flex-row items-center space-y-0 gap-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <NetworkIcon network={post.network} />
                  </div>
                  <div>
                    <CardTitle className="text-lg capitalize">{post.network}</CardTitle>
                    <CardDescription>{new Date(post.date).toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    {post.engagement} engagements
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "credentials" && (
          <div className="grid gap-6">
            {credentials.map((cred) => (
              <Card key={cred.id} className="glass-card slide-up overflow-hidden">
                <CardHeader className="flex flex-row items-center space-y-0 gap-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <NetworkIcon network={cred.network} />
                  </div>
                  <div className="flex-grow">
                    <CardTitle className="text-lg capitalize">{cred.network}</CardTitle>
                    <CardDescription>{cred.username}</CardDescription>
                  </div>
                  {isOwner && editingId !== cred.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(cred.id)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingId === cred.id && editingCredential ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Network</label>
                        <select
                          value={editingCredential.network}
                          onChange={(e) => handleInputChange("network", e.target.value as SocialNetwork)}
                          className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
                        >
                          {networks.map((network) => (
                            <option key={network} value={network}>
                              {network.charAt(0).toUpperCase() + network.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Username</label>
                        <Input
                          value={editingCredential.username}
                          onChange={(e) => handleInputChange("username", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Profile URL</label>
                        <Input
                          value={editingCredential.profileUrl}
                          onChange={(e) => handleInputChange("profileUrl", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      {isOwner && (
                        <>
                          <div>
                            <label className="text-sm font-medium">API Key</label>
                            <div className="mt-1 space-y-2">
                              <Input
                                type="password"
                                value={editingCredential.apiKey}
                                onChange={(e) => handleInputChange("apiKey", e.target.value)}
                              />
                              <a
                                href={NETWORK_API_DOCS[editingCredential.network || "generic"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                              >
                                How to get an API key?
                              </a>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Linked Personas</label>
                            <div className="mt-2 space-y-2">
                              {personas.map(persona => (
                                <div key={persona.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`persona-${persona.id}-${cred.id}`}
                                    checked={(editingCredential.personaIds || []).includes(persona.id)}
                                    onCheckedChange={(checked) => {
                                      const personaIds = editingCredential.personaIds || [];
                                      setEditingCredential(prev => ({
                                        ...prev,
                                        personaIds: checked
                                          ? [...personaIds, persona.id]
                                          : personaIds.filter(id => id !== persona.id),
                                      }));
                                    }}
                                  />
                                  <label
                                    htmlFor={`persona-${persona.id}-${cred.id}`}
                                    className="text-sm text-gray-700"
                                  >
                                    {persona.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                      <Button
                        onClick={() => handleSave(cred.id)}
                        className="mt-4"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Link className="h-4 w-4 text-gray-500" />
                        <a
                          href={cred.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          View Profile
                        </a>
                      </div>
                      {isOwner && (
                        <div>
                          <label className="text-sm font-medium">Linked Personas</label>
                          <div className="mt-2 space-y-2">
                            {personas.map(persona => (
                              <div key={persona.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`persona-${persona.id}-${cred.id}`}
                                  checked={cred.personaIds.includes(persona.id)}
                                  onCheckedChange={() => handlePersonaToggle(cred.id, persona.id)}
                                />
                                <label
                                  htmlFor={`persona-${persona.id}-${cred.id}`}
                                  className="text-sm text-gray-700"
                                >
                                  {persona.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
