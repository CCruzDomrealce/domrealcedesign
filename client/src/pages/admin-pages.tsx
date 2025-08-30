import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Plus, Edit, Trash2, Save, X, Palette, Monitor, Settings } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface PageConfig {
  id: string;
  page: string;
  section: string;
  element: string;
  type: "text" | "color" | "size" | "image" | "number";
  value: string;
  defaultValue?: string;
  metadata?: string;
  updatedAt: string;
  createdAt: string;
}

const pages = [
  { value: "home", label: "Página Inicial" },
  { value: "about", label: "Sobre Nós" },
  { value: "services", label: "Serviços" },
  { value: "portfolio", label: "Portfólio" },
  { value: "contact", label: "Contactos" },
  { value: "loja", label: "Loja Online" },
];

const configTypes = [
  { value: "text", label: "Texto" },
  { value: "color", label: "Cor" },
  { value: "size", label: "Tamanho" },
  { value: "image", label: "Imagem" },
  { value: "number", label: "Número" },
];

export default function AdminPages() {
  const { toast } = useToast();
  const [configs, setConfigs] = useState<PageConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({
    page: "",
    section: "",
    element: "",
    type: "text" as "text" | "color" | "size" | "image" | "number",
    value: "",
    defaultValue: "",
    metadata: "",
  });

  useEffect(() => {
    fetchConfigs();
  }, [selectedPage]);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/pages/${selectedPage}`);
      const data = await response.json();
      setConfigs(data.configs || []);
    } catch (error) {
      console.error('Error fetching configs:', error);
      toast({
        title: "Erro",
        description: "Falha ao carregar configurações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (configData: Omit<PageConfig, 'id' | 'createdAt' | 'updatedAt'>, configId?: string) => {
    try {
      const url = configId ? `/api/admin/pages/${configId}` : '/api/admin/pages';
      const method = configId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configData),
      });

      if (response.ok) {
        await fetchConfigs();
        setEditingId(null);
        setShowAddForm(false);
        resetForm();
        toast({
          title: "Sucesso",
          description: configId ? "Configuração atualizada" : "Configuração criada",
        });
      } else {
        throw new Error('Falha ao salvar');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      toast({
        title: "Erro",
        description: "Falha ao salvar configuração",
        variant: "destructive",
      });
    }
  };

  const deleteConfig = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchConfigs();
        toast({
          title: "Sucesso",
          description: "Configuração eliminada",
        });
      } else {
        throw new Error('Falha ao eliminar');
      }
    } catch (error) {
      console.error('Error deleting config:', error);
      toast({
        title: "Erro",
        description: "Falha ao eliminar configuração",
        variant: "destructive",
      });
    }
  };

  const startEdit = (config: PageConfig) => {
    setEditingId(config.id);
    setEditForm({
      page: config.page,
      section: config.section,
      element: config.element,
      type: config.type,
      value: config.value,
      defaultValue: config.defaultValue || "",
      metadata: config.metadata || "",
    });
  };

  const startAdd = () => {
    setShowAddForm(true);
    setEditForm({
      page: selectedPage,
      section: "",
      element: "",
      type: "text" as "text" | "color" | "size" | "image" | "number",
      value: "",
      defaultValue: "",
      metadata: "",
    });
  };

  const resetForm = () => {
    setEditForm({
      page: "",
      section: "",
      element: "",
      type: "text" as "text" | "color" | "size" | "image" | "number",
      value: "",
      defaultValue: "",
      metadata: "",
    });
  };

  const handleSave = () => {
    if (editingId) {
      saveConfig(editForm, editingId);
    } else {
      saveConfig(editForm);
    }
  };

  const renderConfigValue = (config: PageConfig) => {
    switch (config.type) {
      case 'color':
        return (
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded border border-gray-600"
              style={{ backgroundColor: config.value }}
            />
            <span className="text-sm text-gray-300">{config.value}</span>
          </div>
        );
      case 'image':
        return (
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300 truncate max-w-[200px]">{config.value}</span>
          </div>
        );
      default:
        return (
          <span className="text-sm text-gray-300 truncate max-w-[300px]">
            {config.value}
          </span>
        );
    }
  };

  const renderFormInput = () => {
    switch (editForm.type) {
      case 'color':
        return (
          <div className="flex gap-2">
            <Input
              type="color"
              value={editForm.value}
              onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
              className="w-16 h-10 p-1 bg-gray-800 border-gray-600"
            />
            <Input
              type="text"
              value={editForm.value}
              onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
              placeholder="#ffffff"
              className="flex-1 bg-gray-800 border-gray-600 text-white"
            />
          </div>
        );
      case 'text':
        return (
          <Textarea
            value={editForm.value}
            onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
            placeholder="Texto da configuração"
            className="bg-gray-800 border-gray-600 text-white"
            rows={3}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={editForm.value}
            onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
            placeholder="0"
            className="bg-gray-800 border-gray-600 text-white"
          />
        );
      default:
        return (
          <Input
            type="text"
            value={editForm.value}
            onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
            placeholder="Valor da configuração"
            className="bg-gray-800 border-gray-600 text-white"
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />
      
      {/* Header */}
      <div className="bg-[#111111] border-b border-[#333] mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="gap-2 border-[#e84b5e] text-[#e84b5e] hover:bg-[#e84b5e] hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-8 w-8 text-[#e84b5e]" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Configurações de Páginas
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Edite textos, cores, tamanhos e imagens de todas as páginas do website
          </p>
        </div>
      </div>

      {/* Page Selector */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Label htmlFor="page-select" className="text-white font-medium">
              Página:
            </Label>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-[200px] bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {pages.map((page) => (
                  <SelectItem key={page.value} value={page.value} className="text-white hover:bg-gray-700">
                    {page.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={startAdd}
            className="bg-[#e84b5e] hover:bg-[#d63951] text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Configuração
          </Button>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingId) && (
          <Card className="bg-[#111111] border-[#333] mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5" />
                {editingId ? "Editar Configuração" : "Nova Configuração"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="section" className="text-white">Secção</Label>
                  <Input
                    id="section"
                    value={editForm.section}
                    onChange={(e) => setEditForm({ ...editForm, section: e.target.value })}
                    placeholder="hero, features, about, etc."
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="element" className="text-white">Elemento</Label>
                  <Input
                    id="element"
                    value={editForm.element}
                    onChange={(e) => setEditForm({ ...editForm, element: e.target.value })}
                    placeholder="title, subtitle, description, etc."
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="type" className="text-white">Tipo</Label>
                  <Select value={editForm.type} onValueChange={(value: "text" | "color" | "size" | "image" | "number") => setEditForm({ ...editForm, type: value })}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {configTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-white hover:bg-gray-700">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="value" className="text-white">Valor</Label>
                {renderFormInput()}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="defaultValue" className="text-white">Valor Padrão (opcional)</Label>
                  <Input
                    id="defaultValue"
                    value={editForm.defaultValue}
                    onChange={(e) => setEditForm({ ...editForm, defaultValue: e.target.value })}
                    placeholder="Valor padrão"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="metadata" className="text-white">Metadata (JSON opcional)</Label>
                  <Input
                    id="metadata"
                    value={editForm.metadata}
                    onChange={(e) => setEditForm({ ...editForm, metadata: e.target.value })}
                    placeholder='{"unit": "px", "min": 10, "max": 100}'
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <Save className="h-4 w-4" />
                  Guardar
                </Button>
                <Button 
                  onClick={() => {
                    setEditingId(null);
                    setShowAddForm(false);
                    resetForm();
                  }}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Configs List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-400">A carregar configurações...</div>
            </div>
          ) : configs.length === 0 ? (
            <Card className="bg-[#111111] border-[#333]">
              <CardContent className="py-8 text-center">
                <Settings className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">
                  Nenhuma configuração encontrada
                </p>
                <p className="text-gray-500 text-sm">
                  Crie a primeira configuração para a página {pages.find(p => p.value === selectedPage)?.label}
                </p>
              </CardContent>
            </Card>
          ) : (
            configs.map((config) => (
              <Card key={config.id} className="bg-[#111111] border-[#333]">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Secção / Elemento</div>
                        <div className="text-white font-medium">
                          {config.section} / {config.element}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Tipo</div>
                        <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                          {configTypes.find(t => t.value === config.type)?.label || config.type}
                        </Badge>
                      </div>
                      <div className="md:col-span-1">
                        <div className="text-sm text-gray-500">Valor</div>
                        {renderConfigValue(config)}
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          onClick={() => startEdit(config)}
                          size="sm"
                          variant="outline"
                          className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => deleteConfig(config.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}