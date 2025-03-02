
import { Persona, Credential } from "@/types/social";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Trash2, Users } from "lucide-react";

interface PersonasListProps {
  personas: Persona[];
  credentials: Credential[];
  onDeletePersona: (id: string) => void;
}

export const PersonasList = ({ personas, credentials, onDeletePersona }: PersonasListProps) => {
  if (personas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Users className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium">No personas yet</h3>
        <p className="text-sm text-gray-500 mt-1">
          Create a persona to manage different social media presences
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="grid gap-4 md:grid-cols-2">
        {personas.map((persona) => {
          // Count credentials associated with this persona
          const associatedCredentials = credentials.filter(cred => 
            cred.personaIds.includes(persona.id)
          );
          
          return (
            <Card key={persona.id} className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{persona.name}</CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onDeletePersona(persona.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {persona.description && (
                  <CardDescription>{persona.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-1">
                  {associatedCredentials.length > 0 ? (
                    associatedCredentials.map(cred => (
                      <Badge key={cred.id} variant="outline" className="capitalize">
                        {cred.network}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No linked credentials</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
};
