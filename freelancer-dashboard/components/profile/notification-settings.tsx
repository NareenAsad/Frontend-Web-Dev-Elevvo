"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bell } from "lucide-react"

interface NotificationSettings {
  email: boolean
  push: boolean
  marketing: boolean
}

interface NotificationSettingsProps {
  notifications: NotificationSettings
  setNotifications: (notifications: NotificationSettings) => void
}

export function NotificationSettingsCard({ notifications, setNotifications }: NotificationSettingsProps) {
  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications
        </CardTitle>
        <CardDescription>Manage how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label>Email Notifications</Label>
            <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
          </div>
          <Switch
            checked={notifications.email}
            onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label>Push Notifications</Label>
            <p className="text-sm text-gray-600 dark:text-gray-400">Receive push notifications in your browser</p>
          </div>
          <Switch
            checked={notifications.push}
            onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label>Marketing Emails</Label>
            <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates about new features and tips</p>
          </div>
          <Switch
            checked={notifications.marketing}
            onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
          />
        </div>
      </CardContent>
    </Card>
  )
}
