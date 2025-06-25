
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Image, 
  Download, 
  Palette, 
  Move, 
  Plus,
  Trash2,
  Eye
} from "lucide-react";

interface ComicEditorProps {
  apiKey: string | null;
}

interface ComicPanel {
  id: string;
  text: string;
  imageStyle: string;
  dialogues: string[];
  position: number;
}

const ComicEditor = ({ apiKey }: ComicEditorProps) => {
  const [panels, setPanels] = useState<ComicPanel[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);

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
    
    try {
      // Simulate image generation process
      toast({
        title: "מתחיל ליצור תמונות...",
        description: `יוצר ${panels.length} תמונות בסגנון ${artStyles.find(s => s.value === selectedStyle)?.label || 'קומיקס קלאסי'}.`,
      });
      
      // This would be replaced with actual AI image generation
      setTimeout(() => {
        setIsGeneratingImages(false);
        toast({
          title: "התמונות נוצרו בהצלחה!",
          description: "כל הפנלים כעת כוללים תמונות מתאימות.",
        });
      }, 4000);
      
    } catch (error) {
      toast({
        title: "שגיאה ביצירת התמונות",
        description: "אנא נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
      setIsGeneratingImages(false);
    }
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

    // Simulate download process
    toast({
      title: "מוריד את הקומיקס...",
      description: "הקובץ יישמר במכשיר שלך.",
    });
    
    // Here you would implement the actual download logic
    setTimeout(() => {
      toast({
        title: "הקומיקס הורד בהצלחה!",
        description: "הקובץ נשמר במחשב שלך.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default ComicEditor;
