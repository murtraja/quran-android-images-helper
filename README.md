# quran-android-images-helper
A helper to debug image highlighting issues or database related issues concerned with quran android images (currently supported width_1024, width_1260 and width_1920 images)

Usage:

1. [Show glyphs for a page, say 2](https://quran-android-images-helper.herokuapp.com/?safah=2)

![glyhps for a safah](https://raw.githubusercontent.com/murtraja/quran-android-images-helper/master/screenshots/usage_1.jpg)


2. [Highlight a particular ayah, say 1:7 for width_1920](https://quran-android-images-helper.herokuapp.com/highlight/?ayah=1:7&images=1920)

![highlighted ayah](https://raw.githubusercontent.com/murtraja/quran-android-images-helper/master/screenshots/usage_2.jpg)

3. [Border rectangles, given their coordinates](https://quran-android-images-helper.herokuapp.com/?safah=1&highlight=RectF%28298.0,%20660.0,%20729.0,%20734.0%29%0ARectF%28385.0,%20734.0,%20729.0,%20747.0%29%0ARectF%28385.0,%20747.0,%20639.0,%20811.0%29)

![custom border](https://raw.githubusercontent.com/murtraja/quran-android-images-helper/master/screenshots/custom_border.png)
