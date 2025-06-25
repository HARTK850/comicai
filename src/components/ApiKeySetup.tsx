
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Code, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";

interface ApiKeySetupProps {
  currentApiKey: string | null;
  onApiKeySet: (key: string) => void;
}

const ApiKeySetup = ({ currentApiKey, onApiKeySet }: ApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const validateApiKey = async (key: string): Promise<boolean> => {
    // Basic validation - check if it starts with the expected prefix
    if (!key.startsWith("AIza")) {
      return false;
    }
    
    // Here you would typically make a test API call to validate the key
    // For now, we'll simulate validation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(key.length > 20); // Simple length check
      }, 1500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "שגיאה",
        description: "אנא הזן מפתח API",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    
    try {
      const isValid = await validateApiKey(apiKey);
      
      if (isValid) {
        onApiKeySet(apiKey);
        toast({
          title: "מפתח API נשמר בהצלחה!",
          description: "כעת תוכל להשתמש בכל התכונות המתקדמות של המערכת.",
        });
        setApiKey("");
      } else {
        toast({
          title: "מפתח API לא תקין",
          description: "אנא בדוק שהמפתח נכון ונסה שוב.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "שגיאה בבדיקת המפתח",
        description: "אנא נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveKey = () => {
    onApiKeySet("");
    localStorage.removeItem("comic_creator_api_key");
    toast({
      title: "מפתח API הוסר",
      description: "תוכל להוסיף מפתח חדש בכל עת.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
            <Code className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gradient">הגדרת Gemini AI</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          כדי להשתמש בתכונות הבינה המלאכותית, תצטרך מפתח API של Google Gemini. 
          המפתח נשמר בצורה מוצפנת ומאובטחת במכשיר שלך.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              {currentApiKey ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-orange-500" />
              )}
              <span>סטטוס מפתח API</span>
            </CardTitle>
            <CardDescription>
              {currentApiKey 
                ? "מפתח API פעיל ומוכן לשימוש" 
                : "לא הוגדר מפתח API עדיין"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentApiKey ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    מפתח פעיל ✓
                  </Badge>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowKey(!showKey)}
                    >
                      {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                {showKey && (
                  <div className="p-3 bg-gray-100 rounded-lg font-mono text-sm break-all">
                    {currentApiKey}
                  </div>
                )}
                
                <Button 
                  variant="destructive" 
                  onClick={handleRemoveKey}
                  className="w-full"
                >
                  הסר מפתח API
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <p className="text-gray-600">לא הוגדר מפתח API</p>
                <p className="text-sm text-gray-500 mt-2">
                  הזן מפתח כדי להפעיל את התכונות המתקדמות
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>הוספת מפתח API חדש</CardTitle>
            <CardDescription>
              הזן את מפתח Gemini AI שלך. המפתח יישמר באופן מקומי ומוצפן.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">מפתח Gemini API</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  disabled={isValidating}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isValidating}
              >
                {isValidating ? "בודק תקינות..." : "שמור מפתח API"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">איך להשיג מפתח Gemini API?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-blue-700 space-y-2">
            <p><strong>שלב 1:</strong> היכנס לקונסול Google Cloud Platform</p>
            <p><strong>שלב 2:</strong> צור פרויקט חדש או בחר פרויקט קיים</p>
            <p><strong>שלב 3:</strong> הפעל את Gemini API</p>
            <p><strong>שלב 4:</strong> צור מפתח API חדש</p>
            <p><strong>שלב 5:</strong> העתק את המפתח והדבק אותו כאן</p>
          </div>
          <Button variant="outline" className="mt-4" asChild>
            <a 
              href="https://console.cloud.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              פתח Google Cloud Console
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeySetup;
