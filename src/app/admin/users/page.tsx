import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      
      <Card>
          <CardHeader>
              <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
              <table className="w-full text-sm text-left">
                  <thead className="[&_tr]:border-b">
                      <tr>
                          <th className="h-12 px-4 font-medium text-muted-foreground">User</th>
                          <th className="h-12 px-4 font-medium text-muted-foreground">Role</th>
                          <th className="h-12 px-4 font-medium text-muted-foreground">Plan</th>
                          <th className="h-12 px-4 font-medium text-muted-foreground">Status</th>
                          <th className="h-12 px-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr className="border-b">
                          <td className="p-4 font-medium">shopkeeper@gmail.com</td>
                          <td className="p-4">Shopkeeper</td>
                          <td className="p-4"><Badge variant="outline">Basic</Badge></td>
                          <td className="p-4"><Badge className="bg-green-500">Active</Badge></td>
                          <td className="p-4">
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Override Plan Tier</DropdownMenuItem>
                                      <DropdownMenuItem className="text-destructive">Ban User</DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          </td>
                      </tr>
                      <tr className="border-b">
                          <td className="p-4 font-medium">buyer@gmail.com</td>
                          <td className="p-4">Buyer</td>
                          <td className="p-4">-</td>
                          <td className="p-4"><Badge className="bg-green-500">Active</Badge></td>
                          <td className="p-4">
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                      <DropdownMenuItem className="text-destructive">Ban User</DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          </td>
                      </tr>
                       <tr className="border-b opacity-50 bg-muted/20">
                          <td className="p-4 font-medium">bad_actor@gmail.com</td>
                          <td className="p-4">Shopkeeper</td>
                          <td className="p-4"><Badge variant="outline">Free</Badge></td>
                          <td className="p-4"><Badge variant="destructive">Banned</Badge></td>
                          <td className="p-4">
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Unban User</DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </CardContent>
      </Card>
    </div>
  );
}
