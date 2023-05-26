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
HAVING COUNT(DISTINCT CASE WHEN t.tag IN (:filter_tags) THEN t.tag END) = :filter_tags_count
LIMIT 10;