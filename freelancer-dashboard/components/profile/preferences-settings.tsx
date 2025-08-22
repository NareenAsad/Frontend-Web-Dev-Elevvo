"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Palette, Moon, Sun } from "lucide-react"

interface PreferencesSettingsProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

export function PreferencesSettings({ darkMode, setDarkMode }: PreferencesSettingsProps) {
  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Preferences
        </CardTitle>
        <CardDescription>Customize your dashboard experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <div>
              <Label>Dark Mode</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark themes</p>
            </div>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </CardContent>
    </Card>
  )
}
