import { AppLayout } from '@/components/layout/AppLayout';
import { TeamManagement } from '@/components/team/TeamManagement';
import { useDocuments } from '@/hooks/useDocuments';

const Team = () => {
  const { teamMembers, togglePermission, updateMemberField, addTeamMember, removeMember } = useDocuments();

  return (
    <AppLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-5 max-w-7xl">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Team Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie permissões e acessos da equipe jurídica</p>
        </div>

        <TeamManagement
          members={teamMembers}
          onTogglePermission={togglePermission}
          onUpdateField={updateMemberField}
          onAddMember={addTeamMember}
          onRemoveMember={removeMember}
        />
      </div>
    </AppLayout>
  );
};

export default Team;
