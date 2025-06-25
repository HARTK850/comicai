
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Book, 
  User, 
  FileText,
  Pen,
  Image,
  Code,
  BookOpen
} from "lucide-react";
import ApiKeySetup from "@/components/ApiKeySetup";
import StoryEditor from "@/components/StoryEditor";
import ComicEditor from "@/components/ComicEditor";
import UserDashboard from "@/components/UserDashboard";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    // Load saved data from localStorage
    const savedUser = localStorage.getItem("comic_creator_user");
    const savedApiKey = localStorage.getItem("comic_creator_api_key");
    
    if (savedUser) setCurrentUser(savedUser);
    if (savedApiKey) setApiKey(savedApiKey);
  }, []);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    localStorage.setItem("comic_creator_user", username);
    toast({
      title: "ברוכים הבאים!",
      description: `שלום ${username}, תוכל כעת להתחיל ליצור קומיקסים מדהימים.`,
    });
  };

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
    localStorage.setItem("comic_creator_api_key", key);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setApiKey(null);
    localStorage.removeItem("comic_creator_user");
    localStorage.removeItem("comic_creator_api_key");
    setActiveTab("home");
    toast({
      title: "התנתקת בהצלחה",
      description: "תוכל להתחבר שוב בכל עת.",
    });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <Book className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              יוצר הקומיקסים
            </h1>
            <p className="text-purple-100 text-lg">
              צור קומיקסים מדהימים עם כוח הבינה המלאכותית
            </p>
          </div>

          <Card className="glass-effect border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white">כניסה למערכת</CardTitle>
              <CardDescription className="text-purple-100">
                הזן את שם המשתמש שלך כדי להתחיל
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm onLogin={handleLogin} />
            </CardContent>
          </Card>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 space-x-reverse text-white/80 text-sm">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Pen className="h-4 w-4" />
                <span>עורך סיפורים</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Image className="h-4 w-4" />
                <span>יצירת תמונות AI</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Code className="h-4 w-4" />
                <span>עיצוב מתקדם</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto p-4 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
                <Book className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient">יוצר הקומיקסים</h1>
                <p className="text-gray-600">ברוכים הבאים, {currentUser}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              {apiKey && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  API מוכן ✓
                </Badge>
              )}
              <Button variant="outline" onClick={handleLogout}>
                התנתקות
              </Button>
            </div>
          </div>
          <Separator />
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="home" className="flex items-center space-x-2 space-x-reverse">
              <User className="h-4 w-4" />
              <span>דשבורד</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center space-x-2 space-x-reverse">
              <Code className="h-4 w-4" />
              <span>הגדרת API</span>
            </TabsTrigger>
            <TabsTrigger value="story" className="flex items-center space-x-2 space-x-reverse">
              <FileText className="h-4 w-4" />
              <span>עורך סיפור</span>
            </TabsTrigger>
            <TabsTrigger value="comic" className="flex items-center space-x-2 space-x-reverse">
              <BookOpen className="h-4 w-4" />
              <span>עורך קומיקס</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <UserDashboard />
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <ApiKeySetup 
              currentApiKey={apiKey} 
              onApiKeySet={handleApiKeySet} 
            />
          </TabsContent>

          <TabsContent value="story" className="space-y-6">
            <StoryEditor apiKey={apiKey} />
          </TabsContent>

          <TabsContent value="comic" className="space-y-6">
            <ComicEditor apiKey={apiKey} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const LoginForm = ({ onLogin }: { onLogin: (username: string) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({
        title: "שגיאה",
        description: "אנא הזן שם משתמש",
        variant: "destructive",
      });
      return;
    }
    if (!password.trim()) {
      toast({
        title: "שגיאה", 
        description: "אנא הזן סיסמה",
        variant: "destructive",
      });
      return;
    }
    onLogin(username);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-white">שם משתמש</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          placeholder="הזן שם משתמש"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">סיסמה</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          placeholder="הזן סיסמה"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold"
      >
        כניסה למערכת
      </Button>
    </form>
  );
};

export default Index;
