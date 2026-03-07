const Logo = ({ className = "h-12", showText = false }) => {
  return (
    <div className={`flex items-center gap-3`}>
      <img
        src="/logo.png"
        alt="Da Vinci Aberturas"
        className={className}
      />
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-white font-bold text-xl tracking-tight">
            DA VINCI
          </span>
          <span className="text-accent font-semibold text-xs tracking-wider">
            ABERTURAS
          </span>
        </div>
      )}
    </div>
  )
}

export default Logo
