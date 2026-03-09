import { Home, FileText, LayoutTemplate, Users, Settings } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { ZFlowLogo } from './ZFlowLogo';
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

const menuItems = [
  { title: 'Início', url: '/', icon: Home },
  { title: 'Documentos', url: '/documentos', icon: FileText },
  { title: 'Modelos', url: '/modelos', icon: LayoutTemplate },
  { title: 'Equipe', url: '/equipe', icon: Users },
  { title: 'Configurações', url: '/configuracoes', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-background">
      <SidebarHeader className="p-4 border-b border-border">
        <ZFlowLogo collapsed={collapsed} />
      </SidebarHeader>

      <SidebarContent className="pt-2">
        {!collapsed && (
          <div className="px-4 py-3 mx-3 mb-2 rounded-md bg-muted">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground">
                EN
              </div>
              <div>
                <p className="text-sm font-medium text-foreground leading-none">Ervino Nitz Filho</p>
                <p className="text-xs text-muted-foreground mt-0.5">Diretor Presidente</p>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/'}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      activeClassName="bg-accent text-accent-foreground font-semibold"
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-3">
        {!collapsed && (
          <p className="text-xs text-muted-foreground text-center">Ecourbis Ambiental S.A.</p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
