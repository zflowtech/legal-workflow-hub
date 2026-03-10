import React, { useState } from 'react';
import { FileText, LayoutTemplate, Users, Settings, MessageSquare, LogIn, LogOut } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { EcoUrbisOfficialLogo } from './EcoUrbisOfficialLogo';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  // Mock Auth State
  const [user, setUser] = useState<{ email: string } | null>(null);

  const handleLogin = () => {
    setUser({ email: 'afreitas@ecourbis.com' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const menuItems = [
    { title: 'Chat do Jurídico', url: '/', icon: MessageSquare, public: true },
    { title: 'Documentos', url: '/documentos', icon: FileText, public: false },
    { title: 'Modelos', url: '/modelos', icon: LayoutTemplate, public: false },
    { title: 'Equipe', url: '/equipe', icon: Users, public: false },
    { title: 'Configurações', url: '/configuracoes', icon: Settings, public: false },
  ];

  const visibleItems = menuItems.filter(item => item.public || user);

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-background">
      <SidebarHeader className="p-4 border-b border-border transition-all duration-300">
        <EcoUrbisOfficialLogo collapsed={collapsed} />
      </SidebarHeader>

      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink to={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        {user ? (
          <div className="flex flex-col gap-2">
            {!collapsed && (
              <div className="flex flex-col mb-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Logado como:</span>
                <span className="text-xs font-medium truncate">{user.email}</span>
              </div>
            )}
            <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </SidebarMenuButton>
          </div>
        ) : (
          <SidebarMenuButton onClick={handleLogin}>
            <LogIn className="w-5 h-5" />
            <span>Login Administrativo</span>
          </SidebarMenuButton>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
