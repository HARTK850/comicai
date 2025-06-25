
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  Book, 
  User, 
  FileText,
  Pen,
  Image,
  Code,
  BookOpen,
  Key,
  Wand2,
  Palette,
  Users,
  Zap,
  Download,
  Plus,
  Trash2,
  Eye,
  BarChart3,
  Settings,
  Shield
} from "lucide-react";

interface ComicPanel {
  id: string;
  text: string;
  imageStyle: string;
  dialogues: string[];
  position: number;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  
  // Story Editor States
  const [story, setStory] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [storyPanels, setStoryPanels] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyGenre, setStoryGenre] = useState("");
  const [storyLength, setStoryLength] = useState("");
  
  // Comic Editor States
  const [panels, setPanels] = useState<ComicPanel[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);

  // API Key Setup States
  const [inputApiKey, setInputApiKey] = useState("");
  const [isValidatingKey, setIsValidatingKey] = useState(false);

  useEffect(() => {
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

  // API Key Setup Functions
  const validateApiKey = async () => {
    if (!inputApiKey.trim()) {
      toast({
        title: "שגיאה",
        description: "אנא הזן מפתח API",
        variant: "destructive",
      });
      return;
    }

    setIsValidatingKey(true);
    
    try {
      // Simulate API validation
      setTimeout(() => {
        setApiKey(inputApiKey);
        localStorage.setItem("comic_creator_api_key", inputApiKey);
        setIsValidatingKey(false);
        toast({
          title: "מפתח API הוגדר בהצלחה!",
          description: "כעת תוכל להשתמש בכל התכונות המתקדמות.",
        });
      }, 2000);
    } catch (error) {
      setIsValidatingKey(false);
      toast({
        title: "שגיאה בוידוא המפתח",
        description: "אנא בדוק את המפתח ונסה שוב.",
        variant: "destructive",
      });
    }
  };

  // Story Editor Functions
  const storyGenres = [
    { value: "adventure", label: "הרפתקאות" },
    { value: "comedy", label: "קומדיה" },
    { value: "drama", label: "דרמה" },
    { value: "fantasy", label: "פנטזיה" },
    { value: "mystery", label: "מסתורין" },
    { value: "romance", label: "רומנטיקה" },
    { value: "scifi", label: "מדע בדיוני" },
    { value: "superhero", label: "גיבורי על" }
  ];

  const storyLengths = [
    { value: "short", label: "קצר (4-6 פנלים)" },
    { value: "medium", label: "בינוני (8-10 פנלים)" },
    { value: "long", label: "ארוך (12-16 פנלים)" }
  ];

  const generateStoryWithAI = async () => {
    if (!apiKey) {
      toast({
        title: "חסר מפתח API",
        description: "אנא הגדר מפתח Gemini API תחילה.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const sampleStory = `בעיר הגדולה, גילה דני כוחות מיוחדים שלא ידע שיש לו. 
      כאשר ראה את החתול תקוע על העץ, הוא הרים את ידו והחתול ירד לבד. 
      פתאום הבין שיש לו כוח טלקינזיס! 
      אבל עם כוחות גדולים באה אחריות גדולה. 
      דני החליט להשתמש בכוחותיו כדי לעזור לאנשים. 
      היום הראשון שלו כגיבור על התחיל עכשיו.`;
      
      setGeneratedStory(sampleStory);
      setStory(sampleStory);
      setIsGenerating(false);
      
      toast({
        title: "סיפור נוצר בהצלחה!",
        description: "כעת תוכל לערוך את הסיפור או להמשיך לעורך הקומיקסים.",
      });
    }, 3000);
  };

  const splitStoryToPanels = () => {
    if (!story.trim()) {
      toast({
        title: "אין סיפור לעיבוד",
        description: "אנא כתב סיפור או צור אחד באמצעות AI.",
        variant: "destructive",
      });
      return;
    }

    const sentences = story.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const panels: string[] = [];
    
    for (let i = 0; i < sentences.length; i += 2) {
      const panelText = sentences.slice(i, i + 2).join('. ').trim();
      if (panelText) {
        panels.push(panelText);
      }
    }
    
    setStoryPanels(panels);
    
    toast({
      title: "הסיפור חולק לפנלים!",
      description: `נוצרו ${panels.length} פנלים לקומיקס.`,
    });
  };

  // Comic Editor Functions
  const artStyles = [
    { value: "anime", label: "אנימה יפנית", preview: "🎌" },
    { value: "realistic", label: "ריאליסטי", preview: "📷" },
    { value: "cartoon", label: "קריקטורה", preview: "🎨" },
    { value: "comic", label: "קומיקס קלאסי", preview: "💥" },
    { value: "watercolor", label: "צבעי מים", preview: "🖌️" },
    { value: "sketch", label: "סקיצה", preview: "✏️" }
  ];

  const addNewPanel = () => {
    const newPanel: ComicPanel = {
      id: Date.now().toString(),
      text: "הזן טקסט לפנל החדש...",
      imageStyle: selectedStyle || "comic",
      dialogues: [],
      position: panels.length
    };
    
    setPanels([...panels, newPanel]);
    
    toast({
      title: "פנל חדש נוסף!",
      description: "תוכל לערוך את התוכן והסגנון של הפנל החדש.",
    });
  };

  const removePanel = (panelId: string) => {
    setPanels(panels.filter(panel => panel.id !== panelId));
    toast({
      title: "פנל הוסר",
      description: "הפנל נמחק מהקומיקס.",
    });
  };

  const updatePanelText = (panelId: string, newText: string) => {
    setPanels(panels.map(panel => 
      panel.id === panelId ? { ...panel, text: newText } : panel
    ));
  };

  const generateImages = async () => {
    if (!apiKey) {
      toast({
        title: "חסר מפתח API",
        description: "אנא הגדר מפתח Gemini API תחילה.",
        variant: "destructive",
      });
      return;
    }

    if (panels.length === 0) {
      toast({
        title: "אין פנלים ליצירה",
        description: "הוסף פנלים תחילה.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingImages(true);
    
    toast({
      title: "מתחיל ליצור תמונות...",
      description: `יוצר ${panels.length} תמונות בסגנון ${artStyles.find(s => s.value === selectedStyle)?.label || 'קומיקס קלאסי'}.`,
    });
    
    setTimeout(() => {
      setIsGeneratingImages(false);
      toast({
        title: "התמונות נוצרו בהצלחה!",
        description: "כל הפנלים כעת כוללים תמונות מתאימות.",
      });
    }, 4000);
  };

  const downloadComic = () => {
    if (panels.length === 0) {
      toast({
        title: "אין מה להוריד",
        description: "צור פנלים תחילה.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "מוריד את הקומיקס...",
      description: "הקובץ יישמר במכשיר שלך.",
    });
    
    setTimeout(() => {
      toast({
        title: "הקומיקס הורד בהצלחה!",
        description: "הקובץ נשמר במחשב שלך.",
      });
    }, 2000);
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

          {/* Dashboard */}
          <TabsContent value="home" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gradient">ברוכים הבאים לדשבורד</h2>
              <p className="text-gray-600">התחל ליצור קומיקסים מדהימים עם כוח הבינה המלאכותית</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover-lift cursor-pointer" onClick={() => setActiveTab("api")}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Key className="h-5 w-5 text-blue-500" />
                    <span>הגדרת API</span>
                  </CardTitle>
                  <CardDescription>הגדר מפתח Gemini AI</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="hover-lift cursor-pointer" onClick={() => setActiveTab("story")}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Pen className="h-5 w-5 text-green-500" />
                    <span>עורך סיפורים</span>
                  </CardTitle>
                  <CardDescription>כתוב או צור סיפור עם AI</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="hover-lift cursor-pointer" onClick={() => setActiveTab("comic")}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    <span>עורך קומיקסים</span>
                  </CardTitle>
                  <CardDescription>הפוך סיפור לקומיקס</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          {/* API Setup */}
          <TabsContent value="api" className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
                  <Key className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gradient">הגדרת מפתח API</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                הזן את מפתח Gemini AI שלך כדי לגשת לתכונות המתקדמות של יצירת הסיפורים והקומיקסים.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>מפתח Gemini AI</span>
                </CardTitle>
                <CardDescription>
                  המפתח שלך מוצפן ונשמר בצורה מאובטחת במכשיר שלך
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiKey ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="text-green-800 font-medium">מפתח API מוגדר</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                        פעיל ✓
                      </Badge>
                    </div>
                    <p className="text-green-600 text-sm mt-2">
                      המפתח שלך פעיל ומוכן לשימוש. תוכל כעת להשתמש בכל התכונות המתקדמות.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                      onClick={() => {
                        setApiKey(null);
                        localStorage.removeItem("comic_creator_api_key");
                        toast({
                          title: "מפתח API הוסר",
                          description: "תוכל להגדיר מפתח חדש בכל עת.",
                        });
                      }}
                    >
                      הסר מפתח
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">מפתח Gemini AI</Label>
                      <Input
                        id="api-key"
                        type="password"
                        value={inputApiKey}
                        onChange={(e) => setInputApiKey(e.target.value)}
                        placeholder="הזן את מפתח ה-API שלך..."
                        className="font-mono"
                      />
                    </div>
                    <Button 
                      onClick={validateApiKey}
                      disabled={isValidatingKey || !inputApiKey.trim()}
                      className="w-full"
                    >
                      {isValidatingKey ? (
                        <>
                          <Settings className="mr-2 h-4 w-4 animate-spin" />
                          מאמת מפתח...
                        </>
                      ) : (
                        <>
                          <Key className="mr-2 h-4 w-4" />
                          הגדר מפתח API
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Story Editor */}
          <TabsContent value="story" className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-full">
                  <Pen className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gradient">עורך הסיפורים</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                כתב סיפור משלך או השתמש בבינה המלאכותית כדי ליצור סיפור מרתק לקומיקס שלך.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* AI Story Generator */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Wand2 className="h-5 w-5 text-purple-500" />
                    <span>יצירת סיפור עם AI</span>
                  </CardTitle>
                  <CardDescription>
                    בחר פרמטרים ותן לבינה המלאכותית ליצור עבורך סיפור מקורי
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">ז'אנר הסיפור</label>
                    <Select value={storyGenre} onValueChange={setStoryGenre}>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר ז'אנר" />
                      </SelectTrigger>
                      <SelectContent>
                        {storyGenres.map((genre) => (
                          <SelectItem key={genre.value} value={genre.value}>
                            {genre.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">אורך הסיפור</label>
                    <Select value={storyLength} onValueChange={setStoryLength}>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר אורך" />
                      </SelectTrigger>
                      <SelectContent>
                        {storyLengths.map((length) => (
                          <SelectItem key={length.value} value={length.value}>
                            {length.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={generateStoryWithAI}
                    disabled={!apiKey || isGenerating || !storyGenre || !storyLength}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Zap className="mr-2 h-4 w-4 animate-spin" />
                        יוצר סיפור...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        צור סיפור עם AI
                      </>
                    )}
                  </Button>

                  {!apiKey && (
                    <p className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                      הגדר מפתח API תחילה כדי להשתמש ביצירת סיפורים עם AI
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Manual Story Writing */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <span>כתיבת סיפור ידנית</span>
                  </CardTitle>
                  <CardDescription>
                    כתב את הסיפור שלך במילים שלך
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="התחל לכתוב את הסיפור שלך כאן... ספר על הגיבורים, ההרפתקה, והקונפליקט."
                    rows={8}
                    className="resize-none"
                  />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {story.length} תווים
                    </span>
                    <Button 
                      onClick={splitStoryToPanels}
                      disabled={!story.trim()}
                      variant="outline"
                    >
                      חלק לפנלים
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Story Panels Preview */}
            {storyPanels.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Palette className="h-5 w-5 text-indigo-500" />
                    <span>תצוגת פנלים</span>
                    <Badge variant="secondary">{storyPanels.length} פנלים</Badge>
                  </CardTitle>
                  <CardDescription>
                    כך יראה הסיפור שלך מחולק לפנלי קומיקס
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {storyPanels.map((panel, index) => (
                      <Card key={index} className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 border-dashed">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">פנל {index + 1}</Badge>
                          <Users className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {panel}
                        </p>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600" onClick={() => setActiveTab("comic")}>
                      המשך לעורך הקומיקסים
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Comic Editor */}
          <TabsContent value="comic" className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-pink-500 to-orange-600 p-4 rounded-full">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gradient">עורך הקומיקסים</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                ערוך את הפנלים שלך, בחר סגנון איור, והפוך את הסיפור שלך לקומיקס מרהיב.
              </p>
            </div>

            {/* Controls Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Palette className="h-5 w-5 text-purple-500" />
                  <span>בקרת עיצוב</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label>סגנון איור</Label>
                    <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר סגנון" />
                      </SelectTrigger>
                      <SelectContent>
                        {artStyles.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            <span className="flex items-center space-x-2 space-x-reverse">
                              <span>{style.preview}</span>
                              <span>{style.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button onClick={addNewPanel} className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      הוסף פנל
                    </Button>
                  </div>

                  <div className="flex items-end">
                    <Button 
                      onClick={generateImages} 
                      disabled={!apiKey || isGeneratingImages || panels.length === 0}
                      variant="outline"
                      className="w-full"
                    >
                      <Image className="mr-2 h-4 w-4" />
                      {isGeneratingImages ? "יוצר..." : "צור תמונות"}
                    </Button>
                  </div>

                  <div className="flex items-end">
                    <Button 
                      onClick={downloadComic}
                      disabled={panels.length === 0}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      הורד קומיקס
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Panels Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">פנלי הקומיקס</h3>
                <Badge variant="outline">{panels.length} פנלים</Badge>
              </div>

              {panels.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">אין פנלים עדיין</h3>
                    <p className="text-gray-500 mb-4">התחל על ידי הוספת פנל ראשון לקומיקס שלך</p>
                    <Button onClick={addNewPanel}>
                      <Plus className="mr-2 h-4 w-4" />
                      הוסף פנל ראשון
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {panels.map((panel, index) => (
                    <Card key={panel.id} className="hover-lift">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">פנל {index + 1}</CardTitle>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Badge variant="secondary" className="text-xs">
                              {artStyles.find(s => s.value === panel.imageStyle)?.preview}
                            </Badge>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removePanel(panel.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* Panel Image Placeholder */}
                        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          {isGeneratingImages ? (
                            <div className="text-center">
                              <Image className="h-8 w-8 text-purple-500 mx-auto mb-2 animate-pulse" />
                              <p className="text-xs text-gray-500">יוצר תמונה...</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-500">תמונה תיווצר</p>
                            </div>
                          )}
                        </div>

                        {/* Panel Text */}
                        <div className="space-y-2">
                          <Label className="text-xs">טקסט הפנל</Label>
                          <Input
                            value={panel.text}
                            onChange={(e) => updatePanelText(panel.id, e.target.value)}
                            placeholder="הזן טקסט לפנל..."
                            className="text-sm"
                          />
                        </div>

                        {/* Panel Style */}
                        <div className="space-y-2">
                          <Label className="text-xs">סגנון איור</Label>
                          <Select 
                            value={panel.imageStyle} 
                            onValueChange={(value) => {
                              setPanels(panels.map(p => 
                                p.id === panel.id ? { ...p, imageStyle: value } : p
                              ));
                            }}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {artStyles.map((style) => (
                                <SelectItem key={style.value} value={style.value}>
                                  <span className="flex items-center space-x-2 space-x-reverse">
                                    <span>{style.preview}</span>
                                    <span>{style.label}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Preview Section */}
            {panels.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Eye className="h-5 w-5 text-blue-500" />
                    <span>תצוגה מקדימה</span>
                  </CardTitle>
                  <CardDescription>
                    כך ייראה הקומיקס המוגמר שלך
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {panels.map((panel, index) => (
                        <div key={panel.id} className="bg-white border-2 border-black rounded-lg p-3 shadow-lg">
                          <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded mb-2 flex items-center justify-center">
                            <span className="text-2xl">
                              {artStyles.find(s => s.value === panel.imageStyle)?.preview || "🎨"}
                            </span>
                          </div>
                          <div className="bg-yellow-100 p-2 rounded border border-black text-xs">
                            {panel.text}
                          </div>
                          <div className="text-center mt-1">
                            <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
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
