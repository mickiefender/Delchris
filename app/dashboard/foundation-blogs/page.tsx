'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Loader2,
  Search,
  X,
  Upload,
  BookOpen,
  TrendingUp,
  DollarSign,
  Target
} from 'lucide-react'

interface FoundationBlog {
  id: string
  title: string
  description: string | null
  image_url: string
  raised: number
  goal: number
  progress: number
  published: boolean
  created_at: string
  updated_at: string
}

export default function FoundationBlogsPage() {
  const [blogs, setBlogs] = useState<FoundationBlog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [uploadPreview, setUploadPreview] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    raised: '',
    goal: '',
    published: true,
  })
  const [editingBlog, setEditingBlog] = useState<FoundationBlog | null>(null)
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    raised: '',
    goal: '',
    published: true,
  })
  const [editUploadPreview, setEditUploadPreview] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/foundation-blogs')
      const data = await res.json()
      setBlogs(data.data || [])
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      setUploadPreview(dataUrl)
      setFormData({ ...formData, image_url: dataUrl })
    }
    reader.readAsDataURL(file)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.image_url) {
      alert('Please fill in title and upload an image')
      return
    }

    setIsCreating(true)
    const raised = parseFloat(formData.raised) || 0
    const goal = parseFloat(formData.goal) || 0
    const progress = goal > 0 ? Math.round((raised / goal) * 100) : 0

    try {
      const res = await fetch('/api/foundation-blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || null,
          image_url: formData.image_url,
          raised,
          goal,
          progress,
          published: formData.published,
        }),
      })

      if (res.ok) {
        const result = await res.json()
        setBlogs([result.data[0], ...blogs])
        setFormData({ title: '', description: '', image_url: '', raised: '', goal: '', published: true })
        setUploadPreview('')
        alert('Blog post created successfully!')
      } else {
        alert('Failed to create blog post')
      }
    } catch (error) {
      console.error('Create error:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      const res = await fetch(`/api/foundation-blogs?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id))
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const startEdit = (blog: FoundationBlog) => {
    setEditingBlog(blog)
    setEditFormData({
      title: blog.title,
      description: blog.description || '',
      image_url: blog.image_url,
      raised: blog.raised.toString(),
      goal: blog.goal.toString(),
      published: blog.published,
    })
    setEditUploadPreview(blog.image_url)
  }

  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      setEditUploadPreview(dataUrl)
      setEditFormData({ ...editFormData, image_url: dataUrl })
    }
    reader.readAsDataURL(file)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBlog) return
    if (!editFormData.title || !editFormData.image_url) {
      alert('Please fill in title and upload an image')
      return
    }

    setIsUpdating(true)
    const raised = parseFloat(editFormData.raised) || 0
    const goal = parseFloat(editFormData.goal) || 0
    const progress = goal > 0 ? Math.round((raised / goal) * 100) : 0

    try {
      const res = await fetch('/api/foundation-blogs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingBlog.id,
          title: editFormData.title,
          description: editFormData.description || null,
          image_url: editFormData.image_url,
          raised,
          goal,
          progress,
          published: editFormData.published,
        }),
      })

      if (res.ok) {
        const result = await res.json()
        setBlogs(blogs.map((b) => (b.id === editingBlog.id ? result.data[0] : b)))
        setEditingBlog(null)
        setEditFormData({ title: '', description: '', image_url: '', raised: '', goal: '', published: true })
        setEditUploadPreview('')
        alert('Blog post updated successfully!')
      } else {
        alert('Failed to update blog post')
      }
    } catch (error) {
      console.error('Update error:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const togglePublished = async (blog: FoundationBlog) => {
    try {
      const res = await fetch('/api/foundation-blogs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: blog.id, published: !blog.published }),
      })
      if (res.ok) {
        setBlogs(blogs.map((b) => (b.id === blog.id ? { ...b, published: !b.published } : b)))
      }
    } catch (error) {
      console.error('Toggle error:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading foundation blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Foundation Blogs</h1>
          <p className="text-slate-500 mt-1">Manage "Popular Causes" blog posts for the foundation page</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {blogs.length} posts
          </Badge>
        </div>
      </div>

      {/* Create New Blog Post */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Blog Post
          </CardTitle>
          <CardDescription>Add a new "Popular Cause" entry for the foundation page</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  required
                  placeholder="e.g., The Thirsty are Waiting For your Help"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Raised (₵)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="2400"
                    value={formData.raised}
                    onChange={(e) => setFormData({ ...formData, raised: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Goal (₵)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="4500"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="Brief description of this cause..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image *</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
            </div>

            {uploadPreview && (
              <div className="relative h-40 rounded-lg overflow-hidden border">
                <img src={uploadPreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setUploadPreview(''); setFormData({ ...formData, image_url: '' }) }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…</>
              ) : (
                <><BookOpen className="w-4 h-4 mr-2" /> Publish Blog Post</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Blogs List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            All Blog Posts
          </CardTitle>
          <CardDescription>
            {filteredBlogs.length} post{filteredBlogs.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No blog posts yet</p>
              <p className="text-sm text-slate-400 mt-1">Create your first foundation blog post above</p>
            </div>
          ) : (
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {filteredBlogs.map((blog) => {
                  const progressPercent = blog.goal > 0 ? Math.round((blog.raised / blog.goal) * 100) : blog.progress
                  return (
                    <div
                      key={blog.id}
                      className="p-4 rounded-lg border bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                          <img
                            src={blog.image_url}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-slate-900">{blog.title}</h3>
                              {blog.description && (
                                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{blog.description}</p>
                              )}
                            </div>
                            <Badge
                              variant={blog.published ? 'default' : 'secondary'}
                              className="cursor-pointer"
                              onClick={() => togglePublished(blog)}
                            >
                              {blog.published ? 'Published' : 'Draft'}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-emerald-500" />
                              Raised: ₵{blog.raised?.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4 text-amber-500" />
                              Goal: ₵{blog.goal?.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4 text-blue-500" />
                              Progress: {progressPercent}%
                            </span>
                            <span className="text-slate-400">{formatDate(blog.created_at)}</span>
                          </div>
                          {/* Progress bar */}
                          <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-emerald-500 transition-all"
                              style={{ width: `${Math.min(progressPercent, 100)}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-shrink-0"
                            onClick={() => startEdit(blog)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                            onClick={() => handleDelete(blog.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Edit Blog Dialog */}
      <Dialog open={!!editingBlog} onOpenChange={(open) => { if (!open) { setEditingBlog(null); setEditUploadPreview('') } }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Edit className="w-5 h-5" />
              Edit Blog Post
            </DialogTitle>
            <DialogDescription>
              Update the details of this foundation cause.
            </DialogDescription>
          </DialogHeader>
          {editingBlog && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    required
                    placeholder="e.g., The Thirsty are Waiting For your Help"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Raised (₵)</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="2400"
                      value={editFormData.raised}
                      onChange={(e) => setEditFormData({ ...editFormData, raised: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Goal (₵)</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="4500"
                      value={editFormData.goal}
                      onChange={(e) => setEditFormData({ ...editFormData, goal: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  placeholder="Brief description of this cause..."
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageUpload}
                  className="cursor-pointer"
                />
                <p className="text-xs text-slate-500 mt-1">Leave empty to keep current image, or upload a new one</p>
              </div>

              {editUploadPreview && (
                <div className="relative h-40 rounded-lg overflow-hidden border">
                  <img src={editUploadPreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setEditUploadPreview(''); setEditFormData({ ...editFormData, image_url: '' }) }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Published</label>
                <input
                  type="checkbox"
                  checked={editFormData.published}
                  onChange={(e) => setEditFormData({ ...editFormData, published: e.target.checked })}
                  className="rounded border-slate-300"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setEditingBlog(null); setEditUploadPreview('') }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…</>
                  ) : (
                    <><BookOpen className="w-4 h-4 mr-2" /> Save Changes</>
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
