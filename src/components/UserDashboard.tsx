
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Star, 
  TrendingUp, 
  Calendar,
  Award,
  Users,
  Zap,
  Heart
} from "lucide-react";

const UserDashboard = () => {
  const [userStats, setUserStats] = useState({
    comicsCreated: 0,
    totalPanels: 0,
    averageRating: 0,
    daysActive: 1,
    favoriteStyle: "אנימה יפנית"
  });

  useEffect(() => {
    // Simulate loading user statistics
    setTimeout(() => {
      setUserStats({
        comicsCreated: 3,
        totalPanels: 24,
        averageRating: 4.5,
        daysActive: 7,
        favoriteStyle: "אנימה יפנית"
      });
    }, 1000);
  }, []);

  const achievements = [
    { 
      id: 1, 
      name: "קומיקס ראשון", 
      description: "צרת את הקומיקס הראשון שלך!", 
      completed: true,
      icon: "🏆"
    },
    { 
      id: 2, 
      name: "מאסטר הסיפורים", 
      description: "כתבת 5 סיפורים מקוריים", 
      completed: false,
      progress: 60,
      icon: "📚"
    },
    { 
      id: 3, 
      name: "אמן הפנלים", 
      description: "צרת 50 פנלים", 
      completed: false,
      progress: 48,
      icon: "🎨"
    },
    { 
      id: 4, 
      name: "כוכב הקהילה", 
      description: "קיבלת 10 דירוגי 5 כוכבים", 
      completed: false,
      progress: 30,
      icon: "⭐"
    }
  ];

  const recentActivity = [
    { id: 1, action: "יצרת קומיקס חדש", title: "הרפתקאות דני", time: "לפני שעתיים" },
    { id: 2, action: "הוספת 6 פנלים", title: "סיפור הגיבור", time: "אתמול" },
    { id: 3, action: "שמרת סיפור", title: "מסע בחלל", time: "לפני 3 ימים" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gradient">הדשבורד שלי</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          מבט על על הפעילות שלך, ההישגים והסטטיסטיקות ביצירת קומיקסים.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">קומיקסים שנוצרו</p>
                <p className="text-2xl font-bold text-blue-600">{userStats.comicsCreated}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">סה"כ פנלים</p>
                <p className="text-2xl font-bold text-green-600">{userStats.totalPanels}</p>
              </div>
              <Zap className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">דירוג ממוצע</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {userStats.averageRating} ⭐
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ימים פעילים</p>
                <p className="text-2xl font-bold text-purple-600">{userStats.daysActive}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <Award className="h-5 w-5 text-yellow-500" />
              <span>הישגים</span>
            </CardTitle>
            <CardDescription>
              ההישגים שלך במסע יצירת הקומיקסים
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg bg-gray-50">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{achievement.name}</h4>
                    {achievement.completed && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        הושלם ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                  {!achievement.completed && achievement.progress && (
                    <div className="space-y-1">
                      <Progress value={achievement.progress} className="h-2" />
                      <p className="text-xs text-gray-500">{achievement.progress}% הושלם</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span>פעילות אחרונה</span>
            </CardTitle>
            <CardDescription>
              מה עשית לאחרונה במערכת
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg bg-gray-50">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-600 font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              הצג עוד פעילות
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <Heart className="h-5 w-5 text-red-500" />
            <span>פעולות מהירות</span>
          </CardTitle>
          <CardDescription>
            התחל לעבוד על משהו חדש עכשיו
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button className="p-6 h-auto flex-col space-y-2" variant="outline">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <span className="font-medium">קומיקס חדש</span>
              <span className="text-xs text-gray-500">התחל פרויקט חדש</span>
            </Button>
            
            <Button className="p-6 h-auto flex-col space-y-2" variant="outline">
              <Star className="h-8 w-8 text-yellow-500" />
              <span className="font-medium">המשך עבודה</span>
              <span className="text-xs text-gray-500">חזור לפרויקט שמור</span>
            </Button>
            
            <Button className="p-6 h-auto flex-col space-y-2" variant="outline">
              <Users className="h-8 w-8 text-purple-500" />
              <span className="font-medium">גלריה</span>
              <span className="text-xs text-gray-500">צפה בעבודות אחרות</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
