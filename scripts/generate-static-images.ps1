Add-Type -AssemblyName System.Drawing
$dir = Join-Path $PSScriptRoot "..\static\img" | Resolve-Path
# Social card 1200x630
$w = 1200
$h = 630
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.Clear([System.Drawing.Color]::FromArgb(46, 133, 85))
$font = New-Object System.Drawing.Font('Segoe UI', 56, [System.Drawing.FontStyle]::Bold)
$brush = [System.Drawing.Brushes]::White
$format = New-Object System.Drawing.StringFormat
$format.Alignment = 'Center'
$format.LineAlignment = 'Center'
$rect = New-Object System.Drawing.RectangleF 0, 0, $w, $h
$g.DrawString('SME 2.0', $font, $brush, $rect, $format)
$font2 = New-Object System.Drawing.Font('Segoe UI', 22)
$rect2 = New-Object System.Drawing.RectangleF 0, ($h / 2 + 40), $w, 100
$g.DrawString('Git workflows, reviews, security & automation', $font2, $brush, $rect2, $format)
$jpgPath = Join-Path $dir 'docusaurus-social-card.jpg'
$bmp.Save($jpgPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose()
$bmp.Dispose()
# Favicon 32x32 png - simpler than ico; we'll use png and update config
$icoSize = 32
$fb = New-Object System.Drawing.Bitmap $icoSize, $icoSize
$fg = [System.Drawing.Graphics]::FromImage($fb)
$fg.Clear([System.Drawing.Color]::FromArgb(46, 133, 85))
$ff = New-Object System.Drawing.Font('Segoe UI', 14, [System.Drawing.FontStyle]::Bold)
$fformat = New-Object System.Drawing.StringFormat
$fformat.Alignment = 'Center'
$fformat.LineAlignment = 'Center'
$frect = New-Object System.Drawing.RectangleF 0, 0, $icoSize, $icoSize
$fg.DrawString('S', $ff, $brush, $frect, $fformat)
$pngPath = Join-Path $dir 'favicon.png'
$fb.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)
$fg.Dispose()
$fb.Dispose()
Write-Host "Wrote $jpgPath and $pngPath"
