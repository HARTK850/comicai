
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Pen, Wand2, BookOpen, Palette, Users, Zap } from "lucide-react";

interface StoryEditorProps {
  apiKey: string | null;
}

const StoryEditor = ({ apiKey }: StoryEditorProps) => {
  const [story, setStory] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [storyPanels, setStoryPanels] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyGenre, setStoryGenre] = useState("");
  const [storyLength, setStoryLength] = useState("");

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
    
    try {
      // Simulate AI story generation
      const prompt = `צור סיפור ${storyGenres.find(g => g.value === storyGenre)?.label || "הרפתקאות"} באורך ${storyLengths.find(l => l.value === storyLength)?.label || "בינוני"} לקומיקס`;
      
      // This would be replaced with actual Gemini AI API call
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
      
    } catch (error) {
      toast({
        title: "שגיאה ביצירת הסיפור",
        description: "אנא נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
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

    // Split story into sentences and group them into panels
    const sentences = story.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const panels: string[] = [];
    
    // Group 1-2 sentences per panel
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

  return (
    <div className="space-y-6">
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
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
                המשך לעורך הקומיקסים
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StoryEditor;
