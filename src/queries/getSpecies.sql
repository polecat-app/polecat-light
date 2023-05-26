SELECT 
  s.species_id,
  sn.english AS common_name,
  g.genus,
  s.species,
  s.thumbnail_name,
  SUM(CASE WHEN sv.save_type = 'liked' THEN 1 ELSE 0 END) > 0 AS liked,
  SUM(CASE WHEN sv.save_type = 'seen' THEN 1 ELSE 0 END) > 0 AS seen,
  CASE WHEN es.endemic THEN GROUP_CONCAT(t.tag, ',') || ',endemic' ELSE GROUP_CONCAT(t.tag, ',') END as tags
FROM species s
LEFT JOIN genus g ON s.genus_id = g.genus_id
LEFT JOIN species_name_map snm ON snm.species_id = s.species_id
LEFT JOIN species_name sn ON snm.fts_rowid = sn.rowid
LEFT JOIN saved sv ON s.species_id = sv.species_id
LEFT JOIN species_tags st ON s.species_id = st.species_id
LEFT JOIN tags t ON st.tag_id = t.tag_id
LEFT JOIN ecoregion_species es ON s.species_id = es.species_id AND :eco_code IS NOT NULL 
WHERE (:eco_code IS NULL OR es.eco_code = :eco_code) 
GROUP BY s.species_id
HAVING COUNT(DISTINCT CASE WHEN t.tag IN (:filter_tags) THEN t.tag END) = 
    CASE 
        WHEN 'endemic' in (:filter_tags) THEN :filter_tags_count - 1
        ELSE :filter_tags_count 
    END
AND ('endemic' not in (:filter_tags) OR es.endemic = 1)
ORDER BY (s.thumbnail_name IS NULL),
        s.ranking DESC,
        s.species_id
LIMIT (:range_to - :range_from) 
OFFSET (:range_from);
