module GulpAssetHelper
  def gulp_asset_path(path, type = nil)
    rev_manifest = nil

    config = Rails.application.config

    if Rails.env.production?
      rev_manifest = config.REV_MANIFEST unless config.REV_MANIFEST.nil?
    else
      rev_manifest = JSON.parse(File.read(config.REV_MANIFEST_PATH)) if File.exist?(config.REV_MANIFEST_PATH)
    end

    asset_path = type ? File.join(config.GULP_CONFIG['tasks'][type]['dest'], path) : path
    asset_path = rev_manifest[asset_path] if rev_manifest
    File.absolute_path(asset_path, '/')
  end

  def gulp_js_path(path)
    gulp_asset_path(path, 'js')
  end

  def gulp_css_path(path)
    gulp_asset_path(path, 'css')
  end

  def gulp_image_path(path)
    gulp_asset_path(path, 'images')
  end

  def sprite(id, classes = "", viewBox = "0 0 24 24")
    "<svg class='sprite -#{id} #{classes}' aria-hidden='true' preserveAspectRatio viewBox='#{viewBox}'><use xlink:href='#{gulp_image_path('sprites.svg')}##{id}' /></use></svg>".html_safe
  end
end
