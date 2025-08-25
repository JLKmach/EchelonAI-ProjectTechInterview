# Esquema de Base de Datos - VideoMatch

## 🗄️ Visión General
Base de datos PostgreSQL diseñada para manejar usuarios, videos, matches, ratings y sistema de verificación de VideoMatch.

## 📊 Entidades Principales

### 1. Users (Usuarios)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    bio TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_selfie_verified BOOLEAN DEFAULT FALSE,
    verification_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

### 2. User_Interests (Intereses de Usuario)
```sql
CREATE TABLE user_interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    interest_category VARCHAR(50) NOT NULL,
    interest_value VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, interest_category, interest_value)
);

-- Categorías de intereses predefinidas
INSERT INTO interest_categories (category, display_name) VALUES
('sports', 'Deportes'),
('culture', 'Cultura'),
('music', 'Música'),
('dance', 'Baile'),
('collections', 'Colecciones'),
('travel', 'Viajes'),
('education', 'Educación'),
('cooking', 'Cocina'),
('gaming', 'Gaming'),
('nature', 'Naturaleza');
```

### 3. User_Languages (Idiomas de Usuario)
```sql
CREATE TABLE user_languages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,
    proficiency_level VARCHAR(20) NOT NULL, -- 'native', 'fluent', 'basic'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, language_code)
);
```

### 4. Videos (Videos de Presentación)
```sql
CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    video_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    duration_seconds INTEGER NOT NULL,
    file_size BIGINT NOT NULL,
    format VARCHAR(10) NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    moderation_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. User_Preferences (Preferencias de Match)
```sql
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    min_age INTEGER NOT NULL,
    max_age INTEGER NOT NULL,
    max_distance_km INTEGER NOT NULL,
    preferred_genders TEXT[] NOT NULL,
    preferred_languages TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. Matches (Conexiones entre Usuarios)
```sql
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
    compatibility_score DECIMAL(5,2) NOT NULL,
    match_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    user1_liked BOOLEAN DEFAULT FALSE,
    user2_liked BOOLEAN DEFAULT FALSE,
    mutual_like BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user1_id, user2_id)
);
```

### 7. QR_Encounters (Encuentros Confirmados)
```sql
CREATE TABLE qr_encounters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    qr_code VARCHAR(255) NOT NULL,
    generated_by UUID REFERENCES users(id) ON DELETE CASCADE,
    scanned_by UUID REFERENCES users(id) ON DELETE CASCADE,
    encounter_date TIMESTAMP NOT NULL,
    encounter_location VARCHAR(255),
    is_confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 8. Ratings (Encuestas Post-Encuentro)
```sql
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    encounter_id UUID REFERENCES qr_encounters(id) ON DELETE CASCADE,
    rater_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rated_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    respectful_score INTEGER NOT NULL CHECK (respectful_score >= 1 AND respectful_score <= 5),
    punctual_score INTEGER NOT NULL CHECK (punctual_score >= 1 AND punctual_score <= 5),
    personality_score INTEGER NOT NULL CHECK (personality_score >= 1 AND personality_score <= 5),
    communication_score INTEGER NOT NULL CHECK (communication_score >= 1 AND communication_score <= 5),
    overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
    comments TEXT,
    is_anonymous BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(encounter_id, rater_id)
);
```

### 9. Reports (Sistema de Reportes)
```sql
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    report_type VARCHAR(50) NOT NULL, -- 'inappropriate', 'harassment', 'fake_profile', 'other'
    description TEXT NOT NULL,
    evidence_urls TEXT[],
    severity_level VARCHAR(20) NOT NULL, -- 'low', 'medium', 'high', 'critical'
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'investigating', 'resolved', 'dismissed'
    moderator_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);
```

### 10. Chat_Messages (Mensajes del Chat)
```sql
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text', -- 'text', 'image', 'video'
    media_url VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 11. Verification_Selfies (Selfies de Verificación)
```sql
CREATE TABLE verification_selfies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    selfie_url VARCHAR(500) NOT NULL,
    verification_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    ai_detection_score DECIMAL(5,2),
    human_verifier_id UUID REFERENCES users(id),
    verification_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP
);
```

## 🔗 Índices Recomendados

```sql
-- Índices para performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_location ON users(city, postal_code);
CREATE INDEX idx_users_verification ON users(is_verified, is_email_verified, is_selfie_verified);
CREATE INDEX idx_matches_users ON matches(user1_id, user2_id);
CREATE INDEX idx_matches_compatibility ON matches(compatibility_score DESC);
CREATE INDEX idx_ratings_encounter ON ratings(encounter_id);
CREATE INDEX idx_chat_match ON chat_messages(match_id, created_at);
CREATE INDEX idx_reports_reported ON reports(reported_user_id, status);
```

## 🚀 Funciones y Triggers

### Función para Calcular Compatibilidad
```sql
CREATE OR REPLACE FUNCTION calculate_compatibility(
    user1_id UUID,
    user2_id UUID
) RETURNS DECIMAL(5,2) AS $$
DECLARE
    interest_score DECIMAL(5,2) := 0;
    language_score DECIMAL(5,2) := 0;
    location_score DECIMAL(5,2) := 0;
    total_score DECIMAL(5,2) := 0;
BEGIN
    -- Cálculo de score por intereses comunes
    SELECT COALESCE(COUNT(*) * 10.0, 0) INTO interest_score
    FROM user_interests ui1
    JOIN user_interests ui2 ON ui1.interest_category = ui2.interest_category 
        AND ui1.interest_value = ui2.interest_value
    WHERE ui1.user_id = user1_id AND ui2.user_id = user2_id;
    
    -- Cálculo de score por idiomas
    SELECT COALESCE(COUNT(*) * 15.0, 0) INTO language_score
    FROM user_languages ul1
    JOIN user_languages ul2 ON ul1.language_code = ul2.language_code
    WHERE ul1.user_id = user1_id AND ul2.user_id = user2_id;
    
    -- Score base por ubicación (mismo código postal = +20, misma ciudad = +10)
    SELECT CASE 
        WHEN u1.postal_code = u2.postal_code THEN 20.0
        WHEN u1.city = u2.city THEN 10.0
        ELSE 0.0
    END INTO location_score
    FROM users u1, users u2
    WHERE u1.id = user1_id AND u2.id = user2_id;
    
    total_score := LEAST(interest_score + language_score + location_score, 100.0);
    RETURN total_score;
END;
$$ LANGUAGE plpgsql;
```

## 📊 Estadísticas y Métricas

### Vista para Estadísticas de Usuario
```sql
CREATE VIEW user_stats AS
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    COUNT(DISTINCT m.id) as total_matches,
    COUNT(DISTINCT r.id) as total_ratings_received,
    AVG(r.overall_rating) as average_rating,
    u.verification_score
FROM users u
LEFT JOIN matches m ON (u.id = m.user1_id OR u.id = m.user2_id) AND m.is_active = true
LEFT JOIN ratings r ON u.id = r.rated_user_id
GROUP BY u.id, u.first_name, u.last_name, u.verification_score;
```

## 🔒 Consideraciones de Seguridad

1. **Encriptación:** Todas las contraseñas deben estar hasheadas con bcrypt
2. **Auditoría:** Logs de todas las operaciones críticas
3. **Backup:** Backup automático diario de la base de datos
4. **Acceso:** Restricción de acceso solo a aplicaciones autorizadas
5. **PII:** Encriptación de datos personales sensibles
