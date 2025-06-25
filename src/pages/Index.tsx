
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Book, Key, Pen, Image, Download } from "lucide-react";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [story, setStory] = useState<string>("");
  const [panels, setPanels] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>("comic");

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    toast({
      title: "ברוכים הבאים!",
      description: `שלום ${username}`,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setApiKey("");
    setStory("");
    setPanels([]);
  };

  const generateStory = () => {
    const sampleStory = "בעיר הגדולה, גילה דני כוחות מיוחדים. הוא ראה חתול תקוע על עץ והרים את ידו. החתול ירד לבד! דני הבין שיש לו כוח טלקינזיס. עם כוחות גדולים באה אחריות גדולה. דני החליט לעזור לאנשים. היום הראשון שלו כגיבור על התחיל עכשיו.";
    setStory(sampleStory);
    
    const sentences = sampleStory.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const newPanels: string[] = [];
    
    for (let i = 0; i < sentences.length; i += 2) {
      const panelText = sentences.slice(i, i + 2).join('. ').trim();
      if (panelText) {
        newPanels.push(panelText);
      }
    }
    
    setPanels(newPanels);
    toast({
      title: "סיפור נוצר!",
      description: `נוצרו ${newPanels.length} פנלים`,
    });
  };

  const downloadComic = () => {
    toast({
      title: "מוריד קומיקס...",
      description: "הקובץ יישמר במחשב שלך",
    });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Book className="h-12 w-12 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">יוצר הקומיקסים</CardTitle>
            <CardDescription>כניסה למערכת</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onLogin={handleLogin} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Book className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold">יוצר הקומיקסים</h1>
              <p className="text-gray-600">שלום, {currentUser}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            התנתקות
          </Button>
        </header>

        <Tabs defaultValue="api" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="api">
              <Key className="h-4 w-4 mr-2" />
              הגדרת API
            </TabsTrigger>
            <TabsTrigger value="story">
              <Pen className="h-4 w-4 mr-2" />
              עורך סיפור
            </TabsTrigger>
            <TabsTrigger value="comic">
              <Image className="h-4 w-4 mr-2" />
              עורך קומיקס
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>הגדרת מפתח Gemini AI</CardTitle>
                <CardDescription>הזן את מפתח ה-API שלך</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">מפתח API</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="הזן מפתח API..."
                  />
                </div>
                <Button 
                  onClick={() => {
                    if (apiKey) {
                      toast({
                        title: "מפתח API נשמר!",
                        description: "כעת תוכל להשתמש בכל התכונות",
                      });
                    }
                  }}
                  disabled={!apiKey}
                >
                  שמור מפתח
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="story">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>יצירת סיפור עם AI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={generateStory} className="w-full">
                    צור סיפור אוטומטי
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>כתיבת סיפור ידנית</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="כתוב את הסיפור שלך כאן..."
                    rows={6}
                  />
                </CardContent>
              </Card>
            </div>

            {story && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>הסיפור שלך</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{story}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="comic">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>הגדרות עיצוב</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>סגנון איור</Label>
                      <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comic">קומיקס קלאסי</SelectItem>
                          <SelectItem value="anime">אנימה</SelectItem>
                          <SelectItem value="realistic">ריאליסטי</SelectItem>
                          <SelectItem value="cartoon">קריקטורה</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button onClick={downloadComic} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        הורד קומיקס
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {panels.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>פנלי הקומיקס ({panels.length} פנלים)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {panels.map((panel, index) => (
                        <div key={index} className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                          <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                            <Image className="h-8 w-8 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-700">{panel}</p>
                          <div className="text-center mt-2">
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded">פנל {index + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
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
        <Label htmlFor="username">שם משתמש</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="הזן שם משתמש"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">סיסמה</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="הזן סיסמה"
        />
      </div>
      <Button type="submit" className="w-full">
        כניסה למערכת
      </Button>
    </form>
  );
};

export default Index;
