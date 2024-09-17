'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { signOut } from "next-auth/react"

const Page = () => {
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
      };

    return (
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Account</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="" placeholder="john" />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="" placeholder="john@gmail.com" />
              </div>

              <Button variant="outline">Change Password</Button>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="push-notifications" />
                <Label htmlFor="push-notifications">Push Notifications</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="email-notifications" />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Appearance</h2>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="theme-light" />
                <Label htmlFor="theme-light">Light Theme</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="theme-dark" />
                <Label htmlFor="theme-dark">Dark Theme</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="font-size-medium" />
                <Label htmlFor="font-size-medium">Medium Font Size</Label>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Data & Privacy</h2>

            <div className="space-y-2">
              {/* <Button variant="outline">Download Data</Button> */}
              <Button variant="destructive">Delete Account</Button>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Help & Feedback</h2>

            <div className="space-y-2">
              <Button variant="outline">FAQ</Button>
              <Button variant="outline">Contact Us</Button>
            </div>
          </section>

          <section>
            <Button onClick={handleSignOut} variant="destructive">Sign Out</Button>
          </section>
        </div>
    )
}

export default Page