
import { useState } from "react";
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
import { Facebook, Linkedin, Twitter, Github } from "lucide-react";

type Post = {
  id: string;
  network: "facebook" | "linkedin" | "twitter" | "github";
  content: string;
  date: string;
  engagement: number;
};

const mockPosts: Post[] = [
  {
    id: "1",
    network: "twitter",
    content: "Excited to share my latest project on cross-platform social media management!",
    date: "2024-02-20",
    engagement: 42,
  },
  {
    id: "2",
    network: "linkedin",
    content: "New article about improving social media presence for tech professionals",
    date: "2024-02-19",
    engagement: 156,
  },
];

const NetworkIcon = ({ network }: { network: Post["network"] }) => {
  const icons = {
    facebook: Facebook,
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github,
  };
  const Icon = icons[network];
  return <Icon className="h-5 w-5" />;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<"feed" | "analytics">("feed");

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, Jean Hugues</h1>
            <p className="text-gray-600 mt-1">Manage your social media presence</p>
          </div>
          <Button 
            size="lg"
            className="slide-up bg-primary hover:bg-primary/90"
          >
            Create Post
          </Button>
        </div>

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
      </div>
    </MainLayout>
  );
};

export default Index;
