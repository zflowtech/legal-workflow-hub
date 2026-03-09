import { useState, useCallback, useRef, useEffect } from 'react';
import { TeamMember } from '@/data/mockData';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface TeamManagementProps {
  members: TeamMember[];
  onTogglePermission: (memberId: string, permission: keyof TeamMember['permissoes']) => void;
  onUpdateField: (memberId: string, field: keyof TeamMember, value: string) => void;
  onAddMember: (member: Partial<TeamMember>) => void;
  onRemoveMember: (memberId: string) => void;
}

export function TeamManagement({ members, onTogglePermission, onUpdateField, onAddMember, onRemoveMember }: TeamManagementProps) {
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({ nome: '', cargo: '', email: '' });
  const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingCell && editRef.current) {
      editRef.current.focus();
      editRef.current.select();
    }
  }, [editingCell]);

  const filteredMembers = members.filter(m =>
    m.nome.toLowerCase().includes(search.toLowerCase()) ||
    m.cargo.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = useCallback((id: string, field: string, value: string) => {
    setEditingCell({ id, field });
    setEditValue(value);
  }, []);

  const saveEdit = useCallback(() => {
    if (editingCell && editValue.trim()) {
      onUpdateField(editingCell.id, editingCell.field as keyof TeamMember, editValue.trim());
    }
    setEditingCell(null);
  }, [editingCell, editValue, onUpdateField]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') setEditingCell(null);
  }, [saveEdit]);

  const handleAddMember = useCallback(() => {
    if (newMember.nome && newMember.email) {
      onAddMember(newMember);
      setNewMember({ nome: '', cargo: '', email: '' });
      setDialogOpen(false);
    }
  }, [newMember, onAddMember]);

  const handleDelete = useCallback((memberId: string) => {
    if (confirmDelete === memberId) {
      onRemoveMember(memberId);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(memberId);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  }, [confirmDelete, onRemoveMember]);

  const permissionKeys: (keyof TeamMember['permissoes'])[] = ['viewContracts', 'uploadEvidence', 'signDocuments', 'editTemplates'];
  const permissionLabels: Record<string, string> = {
    viewContracts: 'View Contracts',
    uploadEvidence: 'Upload Evidence',
    signDocuments: 'Sign Documents',
    editTemplates: 'Edit Templates',
  };

  const renderCell = (member: TeamMember, field: 'cargo') => {
    const isEditing = editingCell?.id === member.id && editingCell?.field === field;
    if (isEditing) {
      return (
        <input
          ref={editRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          className="text-sm w-full bg-accent border border-primary rounded px-2 py-1 outline-none"
        />
      );
    }
    return (
      <span
        className="text-sm text-foreground cursor-text hover:bg-accent/50 rounded px-1 -mx-1 transition-colors"
        onClick={() => startEdit(member.id, field, member[field])}
        title="Clique para editar"
      >
        {member[field]}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Input
          placeholder="Buscar membro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72 h-9"
        />
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Membro</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" value={newMember.nome} onChange={(e) => setNewMember(prev => ({ ...prev, nome: e.target.value }))} placeholder="Ex: Dr. João Silva" />
              </div>
              <div>
                <Label htmlFor="cargo">Cargo</Label>
                <Input id="cargo" value={newMember.cargo} onChange={(e) => setNewMember(prev => ({ ...prev, cargo: e.target.value }))} placeholder="Ex: Analista Jurídico" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={newMember.email} onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))} placeholder="Ex: joao@ecourbis.com.br" />
              </div>
              <Button onClick={handleAddMember} className="w-full">Adicionar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Role</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">Email</th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">Status</th>
                {permissionKeys.map((key) => (
                  <th key={key} className="text-center px-3 py-3 font-semibold text-foreground whitespace-nowrap">
                    {permissionLabels[key]}
                  </th>
                ))}
                <th className="text-center px-3 py-3 font-semibold text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                        {member.avatar}
                      </div>
                      <span className="font-medium text-foreground whitespace-nowrap">{member.nome}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{renderCell(member, 'cargo')}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{member.email}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      member.status === 'active'
                        ? 'bg-success/10 text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {member.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  {permissionKeys.map((key) => (
                    <td key={key} className="px-3 py-3 text-center">
                      <Switch
                        checked={member.permissoes[key]}
                        onCheckedChange={() => onTogglePermission(member.id, key)}
                      />
                    </td>
                  ))}
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => startEdit(member.id, 'cargo', member.cargo)}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className={`p-1.5 rounded-md transition-colors ${
                          confirmDelete === member.id
                            ? 'text-destructive bg-destructive/10'
                            : 'text-muted-foreground hover:text-destructive hover:bg-destructive/10'
                        }`}
                      >
                        {confirmDelete === member.id ? <X className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
