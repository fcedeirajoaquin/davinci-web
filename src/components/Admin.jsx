import { useState, useEffect, useMemo } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, set, onValue } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '../config/firebase'
import defaultContent from '../config/defaultContent'

const SECTIONS = [
  { key: 'hero', label: 'Hero' },
  { key: 'about', label: 'Nosotros' },
  { key: 'services', label: 'Servicios' },
  { key: 'gallery', label: 'Galería' },
  { key: 'parallaxCTA', label: 'Parallax CTA' },
  { key: 'testimonials', label: 'Testimonios' },
  { key: 'faq', label: 'FAQ' },
  { key: 'contact', label: 'Contacto' },
  { key: 'footer', label: 'Footer' },
]

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      onLogin()
    } catch {
      setError('Credenciales incorrectas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl w-full max-w-sm space-y-5">
        <h1 className="text-2xl font-bold text-white text-center">Admin CMS</h1>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 text-gray-900 py-3 rounded-xl font-bold hover:bg-cyan-400 transition-colors disabled:opacity-50"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}

function ImageUpload({ path, currentUrl, defaultUrl, onUploaded }) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const fileRef = storageRef(storage, `cms/${path}/${file.name}`)
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)
      onUploaded(url)
    } catch (err) {
      alert('Error subiendo imagen: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const canReset = defaultUrl !== undefined && currentUrl !== defaultUrl

  return (
    <div className="space-y-2">
      {currentUrl && (
        <img src={currentUrl} alt="Preview" className="w-32 h-20 object-cover rounded-lg border border-gray-600" />
      )}
      <label className="block">
        <span className="text-xs text-gray-400">{uploading ? 'Subiendo...' : 'Cambiar imagen'}</span>
        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="block w-full text-sm text-gray-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600 mt-1" />
      </label>
      {canReset && (
        <button
          type="button"
          onClick={() => onUploaded(defaultUrl)}
          className="text-xs text-gray-400 hover:text-cyan-400 underline"
        >
          Volver a la imagen por defecto
        </button>
      )}
    </div>
  )
}

// Lee el valor en un objeto siguiendo un path tipo "items.0.imageUrl".
// Devuelve undefined si algún tramo del path no existe.
function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj)
}

// Etiquetas en español para que el panel sea entendible por gente no técnica.
const LABELS = {
  badge: 'Etiqueta destacada',
  titleLine1: 'Título (renglón 1)',
  titleLine2: 'Título (renglón 2)',
  titlePart1: 'Título (parte normal)',
  titlePart2: 'Título (parte resaltada)',
  titleAccent: 'Título (parte resaltada)',
  subtitle: 'Subtítulo',
  description: 'Descripción',
  sectionLabel: 'Etiqueta de la sección',
  contentTitle: 'Título del bloque',
  contentP1: 'Primer párrafo',
  contentP2: 'Segundo párrafo',
  features: 'Lista de ítems',
  ctaPrimary: 'Botón principal',
  ctaSecondary: 'Botón secundario',
  cta: 'Texto del botón',
  bottomText: 'Texto de abajo',
  bottomCta: 'Botón de abajo',
  stats: 'Números destacados',
  number: 'Número',
  suffix: 'Símbolo (ej: +, %)',
  label: 'Texto',
  imageUrl: 'Imagen',
  imageAlt: 'Descripción de la imagen',
  items: 'Ítems',
  title: 'Título',
  categories: 'Categorías',
  category: 'Categoría',
  id: 'Código interno',
  name: 'Nombre',
  role: 'Cargo / Ubicación',
  text: 'Comentario',
  stars: 'Estrellas (1 a 5)',
  question: 'Pregunta',
  answer: 'Respuesta',
  instagramText: 'Texto de Instagram',
  instagramCta: 'Botón de Instagram',
  instagramUrl: 'Link de Instagram',
  instagram: 'Usuario de Instagram',
  phone: 'Teléfono',
  whatsappNumber: 'Número de WhatsApp',
  whatsappLabel: 'Texto del botón de WhatsApp',
  address: 'Dirección',
  factoryAddress: 'Dirección de la fábrica',
  formTitle: 'Título del formulario',
  mapQuery: 'Ubicación del mapa',
  companyName: 'Nombre de la empresa',
  companySubtitle: 'Bajada del nombre',
  copyright: 'Texto de derechos reservados',
  isUrgency: 'Marcar como urgencia',
}

// Ayudas cortas para los campos que pueden confundir.
const HINTS = {
  imageAlt: 'Describe en pocas palabras qué se ve en la imagen. Ayuda a Google y a personas con baja visión.',
  whatsappNumber: 'Solo números, con código de país y sin el signo +. Ejemplo: 5491161549740',
  instagramUrl: 'Pegá el link completo de tu perfil. Ejemplo: https://www.instagram.com/tucuenta/',
  stars: 'Escribí un número del 1 al 5.',
  mapQuery: 'Avanzado: define qué dirección muestra el mapa. Si no estás seguro, mejor no tocar.',
  id: 'Código que usa el sistema internamente. No lo cambies o se puede romper el filtro de la galería.',
}

// Genera un ítem vacío con la misma forma que el modelo dado, para que
// "Agregar nuevo" arranque limpio en vez de duplicar contenido existente.
function makeBlank(model) {
  if (Array.isArray(model)) return []
  if (model !== null && typeof model === 'object') {
    return Object.fromEntries(Object.entries(model).map(([k, v]) => [k, makeBlank(v)]))
  }
  if (typeof model === 'number') return 0
  if (typeof model === 'boolean') return false
  return ''
}

function labelFor(key) {
  if (LABELS[key]) return LABELS[key]
  const spaced = key.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

// Etiqueta + ayuda opcional para un campo.
function FieldLabel({ name }) {
  return (
    <>
      <label className="block text-sm font-medium text-gray-200 mb-1">{labelFor(name)}</label>
      {HINTS[name] && <p className="text-xs text-gray-500 mb-1.5">{HINTS[name]}</p>}
    </>
  )
}

function SectionEditor({ sectionKey, data, onSave, onDirtyChange }) {
  const [formData, setFormData] = useState(data)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setFormData(data)
  }, [data])

  const dirty = JSON.stringify(formData) !== JSON.stringify(data)

  useEffect(() => {
    onDirtyChange?.(dirty)
  }, [dirty, onDirtyChange])

  const handleSave = async () => {
    setSaving(true)
    try {
      await set(ref(db, `content/${sectionKey}`), formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      onSave?.()
    } catch (err) {
      alert('Error guardando: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const updateField = (path, value) => {
    setFormData((prev) => {
      const keys = path.split('.')
      const result = JSON.parse(JSON.stringify(prev))
      let obj = result
      for (let i = 0; i < keys.length - 1; i++) {
        if (obj[keys[i]] === undefined) obj[keys[i]] = {}
        obj = obj[keys[i]]
      }
      obj[keys[keys.length - 1]] = value
      return result
    })
  }

  const renderField = (key, value, parentPath = '') => {
    const fullPath = parentPath ? `${parentPath}.${key}` : key

    if (Array.isArray(value)) {
      return (
        <div key={fullPath} className="space-y-3">
          <FieldLabel name={key} />
          {value.map((item, index) => {
            if (typeof item === 'string') {
              return (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newArr = [...value]
                      newArr[index] = e.target.value
                      updateField(fullPath, newArr)
                    }}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={() => {
                      if (!window.confirm('¿Borrar este ítem de la lista?')) return
                      const newArr = value.filter((_, i) => i !== index)
                      updateField(fullPath, newArr)
                    }}
                    className="px-3 text-red-400 hover:text-red-300 text-lg"
                    title="Borrar este ítem"
                  >
                    ×
                  </button>
                </div>
              )
            }
            if (typeof item === 'object') {
              return (
                <div key={index} className="bg-gray-700/50 p-4 rounded-xl space-y-3 border border-gray-600/50">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-medium">#{index + 1}</span>
                    <button
                      onClick={() => {
                        if (!window.confirm('¿Eliminar este elemento? Esta acción no se puede deshacer.')) return
                        const newArr = value.filter((_, i) => i !== index)
                        updateField(fullPath, newArr)
                      }}
                      className="text-red-400 hover:text-red-300 text-xs font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                  {Object.entries(item).map(([itemKey, itemValue]) =>
                    renderField(itemKey, itemValue, `${fullPath}.${index}`)
                  )}
                </div>
              )
            }
            return null
          })}
          {value.length > 0 && typeof value[0] === 'string' && (
            <button
              onClick={() => updateField(fullPath, [...value, ''])}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-700 text-cyan-400 text-sm font-medium hover:bg-gray-600"
            >
              + Agregar
            </button>
          )}
          {value.length > 0 && typeof value[0] === 'object' && (
            <button
              onClick={() => updateField(fullPath, [...value, makeBlank(value[0])])}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-700 text-cyan-400 text-sm font-medium hover:bg-gray-600"
            >
              + Agregar nuevo
            </button>
          )}
        </div>
      )
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={fullPath} className="space-y-3 pl-3 border-l-2 border-gray-700">
          <FieldLabel name={key} />
          {Object.entries(value).map(([subKey, subValue]) =>
            renderField(subKey, subValue, fullPath)
          )}
        </div>
      )
    }

    if (typeof value === 'boolean') {
      return (
        <div key={fullPath} className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => updateField(fullPath, e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <label className="text-sm text-gray-300">{labelFor(key)}</label>
        </div>
      )
    }

    if (typeof value === 'number') {
      return (
        <div key={fullPath}>
          <FieldLabel name={key} />
          <input
            type="number"
            value={value}
            onChange={(e) => updateField(fullPath, Number(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400"
          />
        </div>
      )
    }

    const isUrl = key.toLowerCase().includes('url') || key.toLowerCase().includes('image')
    const isLongText = typeof value === 'string' && value.length > 80

    if (isUrl && key.toLowerCase().includes('image')) {
      return (
        <div key={fullPath}>
          <FieldLabel name={key} />
          <ImageUpload
            path={sectionKey}
            currentUrl={value}
            defaultUrl={getByPath(defaultContent[sectionKey], fullPath)}
            onUploaded={(url) => updateField(fullPath, url)}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => updateField(fullPath, e.target.value)}
            className="w-full mt-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400"
            placeholder="O pegar URL directamente"
          />
        </div>
      )
    }

    return (
      <div key={fullPath}>
        <label className="block text-sm font-medium text-gray-300 capitalize mb-1">{key}</label>
        {isLongText ? (
          <textarea
            value={value}
            onChange={(e) => updateField(fullPath, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400 resize-y"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => updateField(fullPath, e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400"
          />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-5 pb-24">
      {Object.entries(formData).map(([key, value]) => renderField(key, value))}

      <div className="sticky bottom-0 -mx-8 px-8 py-4 bg-gray-900/95 backdrop-blur border-t border-gray-700 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving || (!dirty && !saved)}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-cyan-500 text-gray-900 hover:bg-cyan-400'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar cambios'}
        </button>
        {dirty && !saving && (
          <span className="text-sm text-amber-400 font-medium">● Tenés cambios sin guardar</span>
        )}
        {!dirty && !saved && !saving && (
          <span className="text-sm text-gray-500">Todo guardado</span>
        )}
      </div>
    </div>
  )
}

const Admin = () => {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const [content, setContent] = useState(null)
  const [dirty, setDirty] = useState(false)

  const changeSection = (key) => {
    if (key === activeSection) return
    if (dirty && !window.confirm('Tenés cambios sin guardar en esta sección. Si cambiás de sección se van a perder. ¿Querés continuar igual?')) return
    setActiveSection(key)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthLoading(false)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const contentRef = ref(db, 'content')
    const unsubscribe = onValue(contentRef, (snapshot) => {
      setContent(snapshot.val())
    })
    return () => unsubscribe()
  }, [])

  // Memoizado para que su identidad solo cambie cuando cambia el contenido real
  // o la sección. Si se recreara en cada render (p. ej. al actualizar `dirty`),
  // el editor reiniciaría el formulario y se perderían los cambios en curso.
  const mergedData = useMemo(() => {
    const sectionData = content?.[activeSection] || defaultContent[activeSection]
    return { ...defaultContent[activeSection], ...sectionData }
  }, [content, activeSection])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm onLogin={() => {}} />
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-bold text-lg">Da Vinci CMS</h1>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-sm hover:text-cyan-300">
            Ver sitio →
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{user.email}</span>
          <button
            onClick={() => signOut(auth)}
            className="text-red-400 hover:text-red-300 text-sm font-medium"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-56 bg-gray-800/50 border-r border-gray-700 min-h-[calc(100vh-64px)] p-4 space-y-1">
          {SECTIONS.map((section) => (
            <button
              key={section.key}
              onClick={() => changeSection(section.key)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeSection === section.key
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 p-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-2">
            {SECTIONS.find((s) => s.key === activeSection)?.label}
          </h2>
          <p className="text-gray-400 text-sm mb-6 bg-gray-800/60 border border-gray-700 rounded-xl p-4 leading-relaxed">
            Editá los textos e imágenes de abajo. Cuando termines, tocá{' '}
            <strong className="text-cyan-400">Guardar cambios</strong> al final de la página.
            Acordate de <strong className="text-cyan-400">guardar antes de cambiar de sección</strong>, o se pierden los cambios.
          </p>
          <SectionEditor
            key={activeSection}
            sectionKey={activeSection}
            data={mergedData}
            onDirtyChange={setDirty}
          />
        </div>
      </div>
    </div>
  )
}

export default Admin
