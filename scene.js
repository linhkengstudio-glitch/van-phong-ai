    const agents = [
      {
        id: 1,
        deskCode: 'BÀN #1',
        name: 'Khôi',
        shortName: 'Khôi',
        department: 'TRƯỞNG NHÓM (LEADER)',
        role: 'Team Leader • Nhận việc CEO & phân công cho cả đội',
        isCore: true,
        avatar: '🧭',
        colorHex: 0x00f2fe,
        status: 'STANDBY',
        statusText: 'chờ lệnh',
        grade: 'A+',
        tokensK: 0.0,
        costUSD: 0.00,
        msgCount: 0,
        devRuns: 0,
        lastDevRunStage: '',
        deskPos: { x: -14.2, z: -2.0 },
        llm: 'ChatGPT-4o (OpenAI)',
        plugins: ['Task Decomposer Skill', 'ChatGPT-4o Bridge', 'Agent Router MCP'],
        currentTask: 'Đang nghỉ chờ Chị (CEO) giao dự án mới',
        speech: 'Em (Khôi - Leader) đang nghỉ chờ lệnh. Chị (CEO) giao việc là em phân công cả đội làm ngay!',
        cardType: 'Đang nghỉ chờ việc',
        terminalLines: ['> [STANDBY] Bàn #1 (Khôi) đang nghỉ chờ Chị (CEO) giao việc (0 lệnh đang chạy)...'],
        history: ['Đang ở trạng thái nghỉ chờ lệnh (Chưa có dự án nào được giao)'],
        inbox: []
      },
      {
        id: 2,
        deskCode: 'BÀN #2',
        name: 'Linh',
        shortName: 'Linh',
        department: 'THƯ KÝ GIÁM ĐỐC',
        role: 'Thư ký Tổng hợp • Báo cáo vấn đề & trình Sếp duyệt sản phẩm',
        isCore: true,
        avatar: '👩‍💼',
        colorHex: 0xf59e0b,
        status: 'STANDBY',
        statusText: 'chờ lệnh',
        grade: 'A+',
        tokensK: 0.0,
        costUSD: 0.00,
        msgCount: 0,
        devRuns: 0,
        lastDevRunStage: '',
        deskPos: { x: -6.8, z: -2.0 },
        llm: 'Claude 3.5 Sonnet (Anthropic)',
        plugins: ['CEO Notification Skill', 'Approval Gatekeeper', 'Executive Summary AI'],
        currentTask: 'Đang nghỉ chờ việc • Hộp thư Cần Sếp duyệt: 0 mục',
        speech: 'Hiện chưa có dự án nào đang chạy. Em (Linh) đang nghỉ chờ Chị (CEO) giao việc mới ạ!',
        cardType: 'Đang nghỉ chờ việc',
        terminalLines: ['> [STANDBY] Bàn #2 (Linh) đang nghỉ • Hộp thư Cần Sếp duyệt: 0 mục...'],
        history: ['Đang ở trạng thái nghỉ chờ lệnh (Chưa có dự án nào được giao)'],
        inbox: []
      },
      {
        id: 3,
        deskCode: 'BÀN #3',
        name: 'Đức',
        shortName: 'Đức',
        department: 'KỸ SƯ LẬP TRÌNH',
        role: 'Chuyên gia Code • Lập trình & sửa lỗi cùng Minh',
        isCore: true,
        avatar: '👨‍💻',
        colorHex: 0x10b981,
        status: 'STANDBY',
        statusText: 'chờ lệnh',
        grade: 'A',
        tokensK: 0.0,
        costUSD: 0.00,
        msgCount: 0,
        devRuns: 0,
        lastDevRunStage: '',
        deskPos: { x: -14.2, z: 2.0 },
        llm: 'Claude 3.5 Sonnet (Anthropic)',
        plugins: ['Claude 3.5 CodeGen', 'GitHub Copilot MCP', 'Docker Sandbox'],
        currentTask: 'Đang nghỉ chờ lệnh lập trình từ Leader Khôi',
        speech: 'Đang ngồi nghỉ chờ việc. Khi nào Chị (CEO) giao dự án mới em sẽ code ngay!',
        cardType: 'Đang nghỉ chờ việc',
        terminalLines: ['> [STANDBY] Bàn #3 (Đức) đang nghỉ chờ lệnh lập trình...'],
        history: ['Đang ở trạng thái nghỉ chờ lệnh (0 lượt chạy thử)'],
        inbox: []
      },
      {
        id: 4,
        deskCode: 'BÀN #4',
        name: 'Minh',
        shortName: 'Minh',
        department: 'KỸ SƯ KIỂM THỬ',
        role: 'Chuyên gia Kiểm thử • Bắt bug & đi sang bàn Đức trao đổi',
        isCore: true,
        avatar: '🕵️‍♂️',
        colorHex: 0xa855f7,
        status: 'STANDBY',
        statusText: 'chờ lệnh',
        grade: 'A+',
        tokensK: 0.0,
        costUSD: 0.00,
        msgCount: 0,
        devRuns: 0,
        lastDevRunStage: '',
        deskPos: { x: -6.8, z: 2.0 },
        llm: 'DeepSeek R1 (Reasoning)',
        plugins: ['Playwright E2E Runner', 'DeepSeek Bug Hunter', 'Jest Unit Test Skill'],
        currentTask: 'Đang nghỉ chờ sản phẩm để kiểm thử khắt khe 100%',
        speech: 'Đang nghỉ ngơi. Hễ có sản phẩm mới là mình kiểm tra đủ 100% yêu cầu của Chị CEO mới duyệt!',
        cardType: 'Đang nghỉ chờ việc',
        terminalLines: ['> [STANDBY] Bàn #4 (Minh) đang nghỉ chờ bản build để kiểm thử...'],
        history: ['Đang ở trạng thái nghỉ chờ lệnh (0 vòng kiểm thử)'],
        inbox: []
      },
      {
        id: 5,
        deskCode: 'BÀN #5',
        name: 'Vy',
        shortName: 'Vy',
        department: 'THIẾT KẾ (DỰ BỊ)',
        assignedSpecialty: 'Chuyên gia Thiết kế UI/UX & Hệ thống Màu sắc',
        role: 'Tạm thời chưa có việc • Chờ Khôi giao việc sau',
        isCore: false,
        avatar: '🎨',
        colorHex: 0xec4899,
        status: 'STANDBY',
        statusText: 'chờ lệnh',
        grade: 'B+',
        tokensK: 0.0,
        costUSD: 0.00,
        msgCount: 0,
        devRuns: 0,
        lastDevRunStage: '',
        deskPos: { x: 0.6, z: -2.0 },
        llm: 'Gemini 2.5 Pro (Google)',
        plugins: ['Figma UI Plugin', 'Tailwind Styler Skill'],
        currentTask: 'Tạm thời chưa có việc gì — Sẵn sàng khi Khôi điều động thiết kế UI/UX',
        speech: 'Em đang ngồi bàn #5 nghỉ chờ Khôi giao việc thiết kế giao diện ạ!',
        cardType: 'Đang chờ việc',
        terminalLines: ['> [STANDBY] Bàn #5 (Vy) đang ở chế độ chờ lệnh...'],
        history: ['Đang ở trạng thái dự bị chờ Khôi phân công'],
        inbox: []
      },
      {
        id: 6,
        deskCode: 'BÀN #6',
        name: 'Tùng',
        shortName: 'Tùng',
        department: 'NGHIÊN CỨU (DỰ BỊ)',
        assignedSpecialty: 'Chuyên gia Nghiên cứu Thị trường & Tra cứu Web',
        role: 'Tạm thời chưa có việc • Chờ Khôi giao việc sau',
        isCore: false,
        avatar: '🔎',
        colorHex: 0x06b6d4,
        status: 'STANDBY',
        statusText: 'chờ lệnh',
        grade: 'B+',
        tokensK: 0.0,
        costUSD: 0.00,
        msgCount: 0,
        devRuns: 0,
        lastDevRunStage: '',
        deskPos: { x: 0.6, z: 2.0 },
        llm: 'Perplexity Sonar Research',
        plugins: ['Perplexity Web Search', 'Market Scraper Skill'],
        currentTask: 'Tạm thời chưa có việc gì — Sẵn sàng tra cứu dữ liệu bên ngoài khi Khôi gọi',
        speech: 'Chào cả phòng, em là Tùng (#6), đang nghỉ chờ lệnh tra cứu thông tin khi cần!',
        cardType: 'Nhân sự dự bị',
        terminalLines: ['> [STANDBY] Bàn #6 (Tùng) đang chờ lệnh từ Bàn #1 (Khôi)...'],
        history: ['Đang ở trạng thái dự bị chờ Khôi phân công'],
        inbox: []
      },
      {
        id: 7,
        deskCode: 'BÀN #7',
        name: 'Vũ',
        shortName: 'Vũ',
        department: 'BẢO MẬT (DỰ BỊ)',
        assignedSpecialty: 'Chuyên gia Kiểm toán Bảo mật & Rà soát Lỗ hổng',
        role: 'Tạm thời chưa có việc • Chờ Khôi giao việc sau',
        isCore: false,
        avatar: '🛡️',
        colorHex: 0xf43f5e,
        status: 'STANDBY',
        statusText: 'chờ lệnh',
        grade: 'A',
        tokensK: 0.0,
        costUSD: 0.00,
        msgCount: 0,
        devRuns: 0,
        lastDevRunStage: '',
        deskPos: { x: -14.2, z: 5.8 },
        llm: 'DeepSeek R1 (Reasoning)',
        plugins: ['OWASP Security Scanner', 'Auth Token Auditor'],
        currentTask: 'Tạm thời chưa có việc gì — Sẵn sàng quét lỗ hổng bảo mật khi Khôi giao',
        speech: 'Chưa có việc gì, đang nghỉ chờ Khôi phân công rà soát bảo mật.',
        cardType: 'Đang chờ việc',
        terminalLines: ['> [STANDBY] Bàn #7 (Vũ) đang ở chế độ nghỉ chờ việc...'],
        history: ['Đang ở trạng thái dự bị chờ Khôi phân công'],
        inbox: []
      },
      {
        id: 8,
        deskCode: 'BÀN #8',
        name: 'Mai',
        shortName: 'Mai',
        department: 'BIÊN TẬP (DỰ BỊ)',
        assignedSpecialty: 'Chuyên gia Tài liệu Hướng dẫn & Sáng tạo Nội dung',
        role: 'Tạm thời chưa có việc • Chờ Khôi giao việc sau',
        isCore: false,
        avatar: '📝',
        colorHex: 0x8b5cf6,
        status: 'STANDBY',
        statusText: 'chờ lệnh',
        grade: 'B',
        tokensK: 0.0,
        costUSD: 0.00,
        msgCount: 0,
        devRuns: 0,
        lastDevRunStage: '',
        deskPos: { x: -6.8, z: 5.8 },
        llm: 'ChatGPT-4o (OpenAI)',
        plugins: ['Notion Docs Sync', 'Copywriting AI Skill'],
        currentTask: 'Tạm thời chưa có việc gì — Sẵn sàng viết tài liệu hướng dẫn khi Khôi phân công',
        speech: 'Bàn #8 đang rảnh, khi nào cần soạn tài liệu hay nội dung Khôi ới em nhé!',
        cardType: 'Đang chờ việc',
        terminalLines: ['> [STANDBY] Bàn #8 (Mai) đang chờ lệnh từ Khôi...'],
        history: ['Đang ở trạng thái dự bị chờ Khôi phân công'],
        inbox: []
      },
      {
        id: 9,
        deskCode: 'BÀN #9',
        name: 'Bách',
        shortName: 'Bách',
        department: 'DỮ LIỆU (DỰ BỊ)',
        assignedSpecialty: 'Chuyên gia Tối ưu Cơ sở dữ liệu & Phân tích Chỉ số',
        role: 'Tạm thời chưa có việc • Chờ Khôi giao việc sau',
        isCore: false,
        avatar: '📈',
        colorHex: 0x14b8a6,
        status: 'STANDBY',
        statusText: 'chờ lệnh',
        grade: 'A',
        tokensK: 0.0,
        costUSD: 0.00,
        msgCount: 0,
        devRuns: 0,
        lastDevRunStage: '',
        deskPos: { x: 0.6, z: 5.8 },
        llm: 'OpenAI o3-mini (High-Speed)',
        plugins: ['SQL Query Optimizer', 'Chart Analytics Skill'],
        currentTask: 'Tạm thời chưa có việc gì — Sẵn sàng thiết kế cấu trúc SQL khi Khôi giao',
        speech: 'Đang nghỉ ngơi, sẵn sàng hỗ trợ cơ sở dữ liệu khi Khôi điều động.',
        cardType: 'Đang chờ việc',
        terminalLines: ['> [STANDBY] Bàn #9 (Bách) đang rảnh...'],
        history: ['Đang ở trạng thái dự bị chờ Khôi phân công'],
        inbox: []
      },
      {
        id: 10,
        deskCode: 'BÀN #10',
        name: 'Đạt',
        shortName: 'Đạt',
        department: 'HỆ THỐNG (DỰ BỊ)',
        assignedSpecialty: 'Chuyên gia Triển khai Máy chủ Cloud & Docker CI/CD',
        role: 'Tạm thời chưa có việc • Chờ Khôi giao việc sau',
        isCore: false,
        avatar: '☁️',
        colorHex: 0x6366f1,
        status: 'STANDBY',
        statusText: 'chờ lệnh',
        grade: 'B+',
        tokensK: 0.0,
        costUSD: 0.00,
        msgCount: 0,
        devRuns: 0,
        lastDevRunStage: '',
        deskPos: { x: 7.8, z: 2.0 },
        llm: 'Claude 3.5 Sonnet (Anthropic)',
        plugins: ['Docker Sandbox Runner', 'Cloud Deploy Webhook'],
        currentTask: 'Tạm thời chưa có việc gì — Sẵn sàng đóng gói Docker & vận hành máy chủ khi Khôi gọi',
        speech: 'Bàn #10 (Đạt) đang rảnh, sẵn sàng nhận lệnh triển khai hệ thống bất cứ lúc nào!',
        cardType: 'Đang chờ việc',
        terminalLines: ['> [STANDBY] Bàn #10 (Đạt) đang ở chế độ chờ lệnh...'],
        history: ['Đang ở trạng thái dự bị chờ Khôi phân công'],
        inbox: []
      }
    ];

    const CEO_DESK_3D = { x: -20.5, z: -1.8 };
    const MEETING_TABLE_3D = { x: 15.8, z: 2.8, radius: 3.2 };


let officeState={viewMode:'3D',zoomCommandWall:false,hasActiveProject:false,progress:0,paused:false};
agents.forEach(a=>Object.assign(a,{status:'STANDBY',statusText:'chờ việc',speech:'Chưa giao nhiệm vụ',grade:'—',tokensK:0,costUSD:0,msgCount:0,devRuns:0,llm:'Gemini (chưa chọn)',plugins:[]}));
    let scene, camera, renderer, raycaster, mouseVec;
    let giantScreenCanvas, giantScreenCtx, giantScreenTexture, giantScreenMesh;
    let hologramRingMesh = null;
    let backHoloOrbitsGroup = null;
    let robotMeshes = {};
    let cameraTarget = new THREE.Vector3(0, 6.5, -1.2);
    let desiredCameraTarget = new THREE.Vector3(0, 6.5, -1.2);
    let cameraSpherical = { radius: 48, theta: 0.0, phi: 1.19 };
    let desiredSpherical = { radius: 48, theta: 0.0, phi: 1.19 };
    let desiredSceneWidthFit = 55.0;
    let desiredSceneHeightFit = 27.0;
    let userZoomFactor = 1.0;
    let isDragging3D = false;
    let prevMouse = { x: 0, y: 0 };

    function createCodeScreenTexture(themeColorHex, isStandby) {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 140;
      const ctx = c.getContext('2d');

      ctx.fillStyle = isStandby ? '#090d16' : '#051329';
      ctx.fillRect(0, 0, 256, 140);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 42, 140);

      const hexStr = '#' + themeColorHex.toString(16).padStart(6, '0');
      const colors = isStandby
        ? ['#334155', '#1e293b', '#334155']
        : [hexStr, '#00f2fe', '#34d399', '#f472b6', '#facc15', '#cbd5e1'];

      for (let row = 0; row < 10; row++) {
        const y = 20 + row * 10;
        const indent = (row % 3) * 12;
        const w1 = 22 + ((row * 19) % 45);
        const w2 = 30 + ((row * 29) % 65);
        ctx.fillStyle = colors[row % colors.length];
        ctx.fillRect(52 + indent, y, w1, 5);
        ctx.fillStyle = colors[(row + 2) % colors.length];
        ctx.fillRect(52 + indent + w1 + 6, y, w2, 5);
      }

      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }

    // DỰNG MÀN HÌNH TỔNG HOLOGRAM 3D FULL TO TRÀN VIỀN TRONG SUỐT NHƯ ĐẾN TỪ TƯƠNG LAI
    function createGiant3DScreenMesh() {
      giantScreenCanvas = document.createElement('canvas');
      giantScreenCanvas.width = 2560;
      giantScreenCanvas.height = 1120;
      giantScreenCtx = giantScreenCanvas.getContext('2d');

      giantScreenTexture = new THREE.CanvasTexture(giantScreenCanvas);
      giantScreenTexture.minFilter = THREE.LinearFilter;
      giantScreenTexture.magFilter = THREE.LinearFilter;
      if (renderer) {
        giantScreenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      }

      const screenGroup = new THREE.Group();
      // Tỷ lệ Vàng chuẩn 1:1 với độ phân giải Canvas (Rộng 46.0m x Cao 18.0m tại y = 9.1, z = -6.8)
      // Không bị kéo giãn chữ theo bề ngang, đồng thời lấp đầy khoảng trống bên trên và bên dưới!
      screenGroup.position.set(0, 9.1, -6.8);
      screenGroup.rotation.x = 0.04;

      const glassBacking = new THREE.Mesh(
        new THREE.PlaneGeometry(46.1, 18.1),
        new THREE.MeshPhysicalMaterial({
          color: 0x00f2fe,
          transparent: true,
          opacity: 0.07,
          roughness: 0.05,
          metalness: 0.1,
          depthWrite: false
        })
      );
      glassBacking.position.z = -0.05;
      screenGroup.add(glassBacking);

      const screenGeo = new THREE.PlaneGeometry(46.0, 18.0);
      const screenMat = new THREE.MeshBasicMaterial({
        map: giantScreenTexture,
        transparent: true,
        opacity: 0.97,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      giantScreenMesh = new THREE.Mesh(screenGeo, screenMat);
      giantScreenMesh.userData.isGiantScreen = true;
      screenGroup.add(giantScreenMesh);

      const laserBeamMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.85
      });
      const topLaserLine = new THREE.Mesh(new THREE.BoxGeometry(46.0, 0.05, 0.05), laserBeamMat);
      topLaserLine.position.set(0, 9.02, 0.02);
      const bottomLaserLine = new THREE.Mesh(new THREE.BoxGeometry(46.0, 0.05, 0.05), laserBeamMat);
      bottomLaserLine.position.set(0, -9.02, 0.02);
      screenGroup.add(topLaserLine, bottomLaserLine);

      const emitterMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
      const beamConeMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.055,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      [-18, -9, 0, 9, 18].forEach(ex => {
        const emitter = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.6, 0.12, 24), emitterMat);
        emitter.position.set(ex, -9.0, 0);
        screenGroup.add(emitter);

        const lightCone = new THREE.Mesh(new THREE.ConeGeometry(4.4, 5.0, 24, 1, true), beamConeMat);
        lightCone.rotation.x = Math.PI;
        lightCone.position.set(ex, -6.5, -0.1);
        screenGroup.add(lightCone);
      });

      // 5. Các vòng Quỹ đạo Lượng tử 3D (Quantum Holo Orbits) quay lơ lửng PHÍA SAU màn hình trong suốt để thấy rõ độ trong suốt 3D!
      backHoloOrbitsGroup = new THREE.Group();
      backHoloOrbitsGroup.position.set(0, 0, -3.5);
      const orbitRing1 = new THREE.Mesh(
        new THREE.TorusGeometry(8.5, 0.04, 16, 100),
        new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.28 })
      );
      const orbitRing2 = new THREE.Mesh(
        new THREE.TorusGeometry(12.2, 0.03, 16, 100),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.18 })
      );
      const holoSphereGrid = new THREE.Mesh(
        new THREE.IcosahedronGeometry(5.2, 2),
        new THREE.MeshBasicMaterial({ color: 0x0ea5e9, wireframe: true, transparent: true, opacity: 0.14 })
      );
      backHoloOrbitsGroup.add(orbitRing1, orbitRing2, holoSphereGrid);
      screenGroup.add(backHoloOrbitsGroup);

      scene.add(screenGroup);
      drawGiant3DScreenCanvas();
    }

    // Vẽ khung vát góc Sci-Fi trong suốt (Futuristic Chamfered Glass Panel)
    function drawHoloPanel(ctx, x, y, w, h, cut, fillRgba, borderHex, lineWidth = 2) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + cut, y);
      ctx.lineTo(x + w - cut, y);
      ctx.lineTo(x + w, y + cut);
      ctx.lineTo(x + w, y + h - cut);
      ctx.lineTo(x + w - cut, y + h);
      ctx.lineTo(x + cut, y + h);
      ctx.lineTo(x, y + h - cut);
      ctx.lineTo(x, y + cut);
      ctx.closePath();

      if (fillRgba) {
        ctx.fillStyle = fillRgba;
        ctx.fill();
      }
      if (borderHex) {
        ctx.strokeStyle = borderHex;
        ctx.lineWidth = lineWidth;
        ctx.shadowColor = borderHex;
        ctx.shadowBlur = 10;
        ctx.stroke();
      }

      // 4 Góc nhấn Neon sáng rực kiểu HUD Tương Lai
      if (borderHex) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = lineWidth + 1.5;
        const cl = Math.min(24, cut * 1.8);
        // Top-left
        ctx.beginPath();
        ctx.moveTo(x, y + cut + cl);
        ctx.lineTo(x, y + cut);
        ctx.lineTo(x + cut, y);
        ctx.lineTo(x + cut + cl, y);
        ctx.stroke();
        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(x + w, y + h - cut - cl);
        ctx.lineTo(x + w, y + h - cut);
        ctx.lineTo(x + w - cut, y + h);
        ctx.lineTo(x + w - cut - cl, y + h);
        ctx.stroke();
      }
      ctx.restore();
    }

    // VẼ GIAO DIỆN HOLOGRAM TƯƠNG LAI TRONG SUỐT TRÀN VIỀN LÊN MÀN HÌNH 3D KHỔNG LỒ
    function roundRect2D(ctx, x, y, w, h, r, fill, stroke) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      if (fill) ctx.fill();
      if (stroke) ctx.stroke();
    }

    // =========================================================================
    // KHỞI TẠO KHÔNG GIAN 3D VỚI BẦU TRỜI LƯỢNG TỬ PHÍA SAU MÀN HÌNH HOLOGRAM TRONG SUỐT
    // =========================================================================
    function initThreeJSOffice() {
      const canvas = document.getElementById('office3DCanvas');
      const wrapper = document.getElementById('threeCanvasWrapper');
      if (!canvas || !wrapper || typeof THREE === 'undefined') return;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x030712);

      const w = wrapper.clientWidth || window.innerWidth;
      const h = wrapper.clientHeight || (window.innerHeight - 48);
      camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 260);
      updateCameraFromSpherical();

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      raycaster = new THREE.Raycaster();
      mouseVec = new THREE.Vector2();

      const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x050811, 0.9);
      scene.add(hemiLight);

      const mainDirLight = new THREE.DirectionalLight(0xffffff, 0.95);
      mainDirLight.position.set(16, 30, 24);
      mainDirLight.castShadow = true;
      scene.add(mainDirLight);

      const holoCyanLight = new THREE.PointLight(0x00f2fe, 1.1, 45);
      holoCyanLight.position.set(0, 11, -6);
      scene.add(holoCyanLight);

      const meetingGlow = new THREE.PointLight(0x38bdf8, 0.9, 18);
      meetingGlow.position.set(MEETING_TABLE_3D.x, 4.5, MEETING_TABLE_3D.z);
      scene.add(meetingGlow);

      const ceoWarmLight = new THREE.PointLight(0xf59e0b, 0.85, 16);
      ceoWarmLight.position.set(CEO_DESK_3D.x, 5.0, CEO_DESK_3D.z);
      scene.add(ceoWarmLight);

      // Tạo trường hạt ánh sáng Lượng tử 3D phía sau màn hình để nổi bật hiệu ứng kính trong suốt!
      buildFuturisticStarfieldAndGrid();

      // Dựng Màn hình Tổng Hologram 3D Full To Tràn Viền Trong Suốt
      createGiant3DScreenMesh();

      // Dựng kiến trúc sàn văn phòng, bàn CEO, bàn họp tròn & 10 bàn Robot
      build3DOfficeArchitecture();
      build3DCEODesk();
      build3DMeetingRoom();
      agents.forEach(ag => build3DAgentDeskAndRobot(ag));

      wrapper.addEventListener('contextmenu', e => e.preventDefault());
      wrapper.addEventListener('mousedown', e => {
        isDragging3D = true;
        officeState._dragBtn = e.button;
        officeState._dragMoved = 0;
        prevMouse = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener('mousemove', e => {
        if (!isDragging3D) return;
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        officeState._dragMoved = (officeState._dragMoved || 0) + Math.abs(dx) + Math.abs(dy);
        prevMouse = { x: e.clientX, y: e.clientY };

        // Mặc định kéo chuột trái là DI CHUYỂN LÊN/XUỐNG/TRÁI/PHẢI (Pan) để xem rõ mọi góc khi đang Zoom!
        // Giữ Shift hoặc chuột phải (hoặc khi bật chế độ Xoay) thì xoay góc 3D.
        const isRotateAction = (officeState.dragMode === 'ROTATE') || e.shiftKey || officeState._dragBtn === 2;
        if (isRotateAction) {
          desiredSpherical.theta = Math.max(-0.65, Math.min(0.65, desiredSpherical.theta - dx * 0.004));
          desiredSpherical.phi = Math.max(0.48, Math.min(1.52, desiredSpherical.phi - dy * 0.004));
        } else {
          const panSpeed = 0.032 * Math.max(0.45, userZoomFactor);
          desiredCameraTarget.x = Math.max(-18.5, Math.min(18.5, desiredCameraTarget.x - dx * panSpeed));
          desiredCameraTarget.y = Math.max(-1.0, Math.min(16.5, desiredCameraTarget.y + dy * panSpeed));
        }
      });
      window.addEventListener('mouseup', () => {
        isDragging3D = false;
      });

      // Zoom thông minh theo vị trí mũi chuột & Tự động cân tâm khi thu nhỏ, nhấp đúp chuột để về toàn cảnh
      wrapper.addEventListener('wheel', e => {
        e.preventDefault();
        const rect = wrapper.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        const zoomIn = e.deltaY < 0;
        const delta = zoomIn ? -0.065 : 0.065;
        const prevZoom = userZoomFactor;
        userZoomFactor = Math.max(0.28, Math.min(1.4, userZoomFactor + delta));

        if (Math.abs(userZoomFactor - prevZoom) > 0.001) {
          if (zoomIn) {
            desiredCameraTarget.x = Math.max(-19.5, Math.min(19.5, desiredCameraTarget.x + normX * 1.8));
            desiredCameraTarget.y = Math.max(-0.5, Math.min(17.5, desiredCameraTarget.y + normY * 1.6));
          } else if (userZoomFactor >= 0.92) {
            // Khi lăn chuột thu nhỏ ra xa thì tự động đưa tâm nhìn mượt về lại chính giữa văn phòng
            desiredCameraTarget.x += (0 - desiredCameraTarget.x) * 0.28;
            desiredCameraTarget.y += (4.5 - desiredCameraTarget.y) * 0.28;
          }
        }
      }, { passive: false });

      wrapper.addEventListener('dblclick', () => {
        focus3DCamera('overview');
      });

      // Hỗ trợ Cảm ứng chạm kéo di chuyển Lên/Xuống/Trái/Phải
      wrapper.addEventListener('touchstart', e => {
        if (e.touches.length === 1) {
          isDragging3D = true;
          prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      }, { passive: true });
      wrapper.addEventListener('touchmove', e => {
        if (!isDragging3D || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - prevMouse.x;
        const dy = e.touches[0].clientY - prevMouse.y;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        const panSpeed = 0.035 * Math.max(0.45, userZoomFactor);
        desiredCameraTarget.x = Math.max(-18.5, Math.min(18.5, desiredCameraTarget.x - dx * panSpeed));
        desiredCameraTarget.y = Math.max(-1.0, Math.min(16.5, desiredCameraTarget.y + dy * panSpeed));
      }, { passive: true });

      // Hỗ trợ phím mũi tên bàn phím (↑ ↓ ← →) để dịch chuyển góc nhìn
      window.addEventListener('keydown', e => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName || '')) return;
        if (e.key === 'ArrowUp') { e.preventDefault(); pan3DCamera(0, 1.8); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); pan3DCamera(0, -1.8); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); pan3DCamera(-2.4, 0); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); pan3DCamera(2.4, 0); }
      });
      wrapper.addEventListener('touchend', () => {
        isDragging3D = false;
      });

      // Tự động theo dõi kích thước khung nhìn (kể cả khi kéo chia đôi màn hình Laptop/PC)
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => onResize3DOffice());
        ro.observe(wrapper);
      }

      wrapper.addEventListener('click', e => {
        if ((officeState._dragMoved || 0) > 8) return;
        const rect = canvas.getBoundingClientRect();
        mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouseVec, camera);

        const pickables = [];
        if (giantScreenMesh) pickables.push(giantScreenMesh);
        Object.values(robotMeshes).forEach(rm => {
          rm.group.traverse(child => {
            if (child.isMesh) {
              child.userData.agentId = rm.agentId;
              pickables.push(child);
            }
          });
        });

        const hits = raycaster.intersectObjects(pickables, false);
        if (hits.length > 0) {
          const hitObj = hits[0].object;
          if (hitObj.userData.agentId) {
            openAgentDeskModal(hitObj.userData.agentId);
          } else if (hitObj.userData.isGiantScreen) {
            toggleZoomCommandWall();
          }
        }
      });

      window.addEventListener('resize', onResize3DOffice);
      onResize3DOffice();
      requestAnimationFrame(animate3DOffice);
    }

    function buildFuturisticStarfieldAndGrid() {
      const particleCount = 320;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 85;
        positions[i * 3 + 1] = Math.random() * 28 - 2;
        positions[i * 3 + 2] = -11 - Math.random() * 25;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x00f2fe,
        size: 0.22,
        transparent: true,
        opacity: 0.65
      });
      const stars = new THREE.Points(pGeo, pMat);
      scene.add(stars);
    }

    // Tự động tính khoảng cách Camera ôm sát cả chiều cao (Sàn + Màn hình tổng) lẫn chiều ngang (52.5m)
    // Giúp màn hình PC to/rộng hiển thị lấp đầy khung hình, triệt tiêu khoảng trống đen 2 bên!
    // Cân bằng khung nhìn 3D: Ưu tiên lấp đầy chiều cao (không để trống đen trên/dưới) đồng thời vừa vặn bề ngang 46m
    function getAspectAdjustedRadius(baseRadius, requiredWidthMeters) {
      if (!camera) return baseRadius;
      const vFovRad = (camera.fov * Math.PI) / 180;
      const halfVertTan = Math.tan(vFovRad / 2);
      const halfHorizTan = halfVertTan * Math.max(0.65, camera.aspect || 1.77);

      const radiusForHeight = ((desiredSceneHeightFit || 27.0) * 0.46) / halfVertTan;
      const radiusForWidth = (requiredWidthMeters * 0.55) / halfHorizTan;
      return Math.max(baseRadius * 0.82, radiusForHeight, radiusForWidth) * userZoomFactor;
    }

    function updateCameraFromSpherical() {
      if (!camera) return;
      const targetResponsiveRadius = getAspectAdjustedRadius(desiredSpherical.radius, desiredSceneWidthFit);
      cameraTarget.lerp(desiredCameraTarget, 0.12);
      cameraSpherical.radius += (targetResponsiveRadius - cameraSpherical.radius) * 0.12;
      cameraSpherical.theta += (desiredSpherical.theta - cameraSpherical.theta) * 0.12;
      cameraSpherical.phi += (desiredSpherical.phi - cameraSpherical.phi) * 0.12;

      const r = cameraSpherical.radius;
      const sinPhi = Math.sin(cameraSpherical.phi);
      camera.position.x = cameraTarget.x + r * sinPhi * Math.sin(cameraSpherical.theta);
      camera.position.y = cameraTarget.y + r * Math.cos(cameraSpherical.phi);
      camera.position.z = cameraTarget.z + r * sinPhi * Math.cos(cameraSpherical.theta);
      camera.lookAt(cameraTarget);
    }



    function toggleBottomToolbar() {
      const bar = document.getElementById('bottomViewToolbar');
      const icon = document.getElementById('bottomBarToggleIcon');
      const txt = document.getElementById('bottomBarToggleText');
      if (!bar) return;
      const isHidden = bar.classList.toggle('hidden');
      if (icon) icon.textContent = isHidden ? '🔼' : '🔽';
      if (txt) txt.textContent = isHidden ? 'Hiện thanh góc nhìn' : 'Ẩn thanh góc nhìn';
    }

    function toggleLeftVerticalDock() {
      const dock = document.getElementById('leftVerticalToolbar');
      const arrow = document.getElementById('leftDockArrow');
      if (!dock) return;
      const isHidden = dock.classList.toggle('hidden');
      if (arrow) arrow.textContent = isHidden ? '▶' : '◀';
    }

    function pan3DCamera(dx, dy) {
      desiredCameraTarget.x = Math.max(-18.5, Math.min(18.5, desiredCameraTarget.x + dx));
      desiredCameraTarget.y = Math.max(-1.0, Math.min(16.5, desiredCameraTarget.y + dy));
    }



    function focus3DCamera(preset) {
      officeState.zoomCommandWall = false;
      userZoomFactor = 1.0;
      document.getElementById('btnZoomScreen').textContent = 'Xem màn hình';
      if (preset === 'overview') {
        desiredCameraTarget.set(0, 6.5, -1.2);
        desiredSpherical = { radius: 48, theta: 0.0, phi: 1.19 };
        desiredSceneWidthFit = 55.0;
        desiredSceneHeightFit = 27.0;
      } else if (preset === 'executive') {
        desiredCameraTarget.set(-10.5, 1.5, -2.0);
        desiredSpherical = { radius: 16.5, theta: -0.12, phi: 0.96 };
        desiredSceneWidthFit = 20.0;
      } else if (preset === 'devqa') {
        desiredCameraTarget.set(-6.0, 1.4, 2.2);
        desiredSpherical = { radius: 16.5, theta: 0.08, phi: 0.94 };
        desiredSceneWidthFit = 20.0;
      } else if (preset === 'meeting') {
        desiredCameraTarget.set(MEETING_TABLE_3D.x, 1.4, MEETING_TABLE_3D.z);
        desiredSpherical = { radius: 15.5, theta: 0.22, phi: 0.94 };
        desiredSceneWidthFit = 16.0;
      }
    }

    function build3DOfficeArchitecture() {
      // Sàn văn phòng 3D trải rộng 47.6m x 15.6m cân xứng hoàn hảo với Màn hình Tổng 52.5m phía trên
      const baseFloor = new THREE.Mesh(
        new THREE.BoxGeometry(47.6, 0.55, 15.6),
        new THREE.MeshStandardMaterial({ color: 0x091020, roughness: 0.6, metalness: 0.25 })
      );
      baseFloor.position.set(0, -0.28, 1.8);
      baseFloor.receiveShadow = true;
      scene.add(baseFloor);

      const floorEdgeGlow = new THREE.Mesh(
        new THREE.BoxGeometry(47.75, 0.08, 15.75),
        new THREE.MeshBasicMaterial({ color: 0x00f2fe })
      );
      floorEdgeGlow.position.set(0, -0.05, 1.8);
      scene.add(floorEdgeGlow);

      // Lưới ánh sáng công nghệ bao quanh không gian sàn mở rộng để không bao giờ có cảm giác trống đen 2 bên
      const ambientGrid = new THREE.GridHelper(90, 45, 0x0ea5e9, 0x08142c);
      ambientGrid.position.set(0, -0.52, 0);
      scene.add(ambientGrid);

      const zones = [
        { x: -20.5, z: -1.8, w: 5.0, d: 5.2, color: 0x2a1810 },  // Phòng Giám đốc CEO
        { x: -6.8, z: 1.8, w: 21.5, d: 13.4, color: 0x0f1b36 },  // Khu Nhân sự Chính & Dự bị
        { x: 7.8, z: 1.8, w: 6.2, d: 13.4, color: 0x141f35 },    // Khu Kỹ thuật Mở rộng
        { x: 16.5, z: 1.8, w: 10.2, d: 13.4, color: 0x191c26 }   // Phòng Họp Bàn Tròn
      ];
      zones.forEach(z => {
        const carpet = new THREE.Mesh(
          new THREE.BoxGeometry(z.w, 0.05, z.d),
          new THREE.MeshStandardMaterial({ color: z.color, roughness: 0.85 })
        );
        carpet.position.set(z.x, 0.03, z.z);
        carpet.receiveShadow = true;
        scene.add(carpet);
      });

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.14,
        roughness: 0.08,
        metalness: 0.1
      });
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8, roughness: 0.2 });

      const walls = [
        { x: 0, z: 9.4, w: 47.2, h: 1.2, d: 0.08 },
        { x: -23.5, z: 1.8, w: 0.08, h: 1.2, d: 15.2 },
        { x: 23.5, z: 1.8, w: 0.08, h: 1.2, d: 15.2 },
        { x: 11.2, z: 1.8, w: 0.08, h: 1.3, d: 13.4 }
      ];
      walls.forEach(w => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w.w, w.h, w.d), glassMat);
        m.position.set(w.x, w.h / 2, w.z);
        scene.add(m);
        const rail = new THREE.Mesh(new THREE.BoxGeometry(w.w + 0.04, 0.05, w.d + 0.04), frameMat);
        rail.position.set(w.x, w.h, w.z);
        scene.add(rail);
      });

      const plantLocations = [
        { x: -22.5, z: 8.6 },
        { x: 22.5, z: 8.6 },
        { x: -22.5, z: -4.8 },
        { x: 22.5, z: -4.8 },
        { x: 11.8, z: -4.2 },
        { x: 11.8, z: 7.8 }
      ];
      plantLocations.forEach(pl => buildDesignerPlant(pl.x, pl.z));
    }

    function buildDesignerPlant(x, z) {
      const pg = new THREE.Group();
      pg.position.set(x, 0, z);

      const pot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.3, 0.68, 20),
        new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3 })
      );
      pot.position.y = 0.34;
      pg.add(pot);

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.09, 0.7, 10),
        new THREE.MeshStandardMaterial({ color: 0x78350f })
      );
      stem.position.y = 0.95;
      pg.add(stem);

      const leafColors = [0x10b981, 0x059669, 0x34d399, 0x047857];
      const leafOffsets = [
        { dx: 0, dy: 1.38, dz: 0, r: 0.48 },
        { dx: -0.26, dy: 1.18, dz: 0.18, r: 0.36 },
        { dx: 0.28, dy: 1.22, dz: -0.15, r: 0.38 },
        { dx: 0.12, dy: 1.56, dz: 0.14, r: 0.32 }
      ];
      leafOffsets.forEach((lf, i) => {
        const crown = new THREE.Mesh(
          new THREE.DodecahedronGeometry(lf.r, 1),
          new THREE.MeshStandardMaterial({ color: leafColors[i % leafColors.length], roughness: 0.55 })
        );
        crown.position.set(lf.dx, lf.dy, lf.dz);
        crown.scale.set(1.1, 0.82, 1.1);
        pg.add(crown);
      });

      scene.add(pg);
    }

    function build3DCEODesk() {
      const g = new THREE.Group();
      g.position.set(CEO_DESK_3D.x, 0, CEO_DESK_3D.z);

      const deskMain = new THREE.Mesh(
        new THREE.BoxGeometry(2.7, 0.1, 1.35),
        new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.35, metalness: 0.15 })
      );
      deskMain.position.y = 0.92;
      g.add(deskMain);

      const goldRim = new THREE.Mesh(
        new THREE.BoxGeometry(2.74, 0.04, 1.39),
        new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.85, roughness: 0.2 })
      );
      goldRim.position.y = 0.89;
      g.add(goldRim);

      [-1.1, 1.1].forEach(lx => {
        const panelLeg = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.88, 1.15),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6 })
        );
        panelLeg.position.set(lx, 0.44, 0);
        g.add(panelLeg);
      });

      const ceoTex = createCodeScreenTexture(0xf59e0b, false);
      const monFrame = new THREE.Mesh(
        new THREE.BoxGeometry(1.42, 0.64, 0.05),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7 })
      );
      monFrame.position.set(0, 1.36, -0.32);
      g.add(monFrame);

      const monScreen = new THREE.Mesh(
        new THREE.PlaneGeometry(1.36, 0.58),
        new THREE.MeshBasicMaterial({ map: ceoTex })
      );
      monScreen.position.set(0, 1.36, -0.29);
      g.add(monScreen);

      buildErgonomicChair(g, 0, 0.82, 0xfef3c7, 0xd97706);

      const ceoAvatar = buildSleekRobotMesh(0xf59e0b, false, true);
      ceoAvatar.group.position.set(0, 0, 0.82);
      g.add(ceoAvatar.group);

      scene.add(g);
    }

    function build3DMeetingRoom() {
      const tableGroup = new THREE.Group();
      tableGroup.position.set(MEETING_TABLE_3D.x, 0, MEETING_TABLE_3D.z);

      const woodSubTop = new THREE.Mesh(
        new THREE.CylinderGeometry(2.35, 2.25, 0.1, 36),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.4 })
      );
      woodSubTop.position.y = 0.88;
      tableGroup.add(woodSubTop);

      const glassTop = new THREE.Mesh(
        new THREE.CylinderGeometry(2.45, 2.45, 0.04, 36),
        new THREE.MeshPhysicalMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.3, roughness: 0.1 })
      );
      glassTop.position.y = 0.95;
      tableGroup.add(glassTop);

      const holoProjector = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.55, 0.06, 24),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 })
      );
      holoProjector.position.y = 0.99;
      tableGroup.add(holoProjector);

      hologramRingMesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.34, 1),
        new THREE.MeshBasicMaterial({ color: 0x00f2fe, wireframe: true })
      );
      hologramRingMesh.position.y = 1.44;
      tableGroup.add(hologramRingMesh);

      const ped = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.85, 0.88, 24),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.6 })
      );
      ped.position.y = 0.44;
      tableGroup.add(ped);

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const chairHolder = new THREE.Group();
        chairHolder.position.set(Math.cos(angle) * 3.1, 0, Math.sin(angle) * 3.1);
        chairHolder.lookAt(0, 0, 0);
        chairHolder.rotation.y += Math.PI;
        buildErgonomicChair(chairHolder, 0, 0, 0x1e293b, 0x00f2fe);
        tableGroup.add(chairHolder);
      }

      scene.add(tableGroup);
    }

    function buildErgonomicChair(parentGroup, x, z, seatColorHex, accentHex) {
      const cg = new THREE.Group();
      cg.position.set(x, 0, z);

      const metalMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.75, roughness: 0.25 });
      const cushionMat = new THREE.MeshStandardMaterial({ color: seatColorHex, roughness: 0.55 });
      const accentMat = new THREE.MeshStandardMaterial({ color: accentHex, roughness: 0.4 });

      const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.46, 12), metalMat);
      cylinder.position.y = 0.25;
      cg.add(cylinder);

      for (let i = 0; i < 5; i++) {
        const ang = (i / 5) * Math.PI * 2;
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.36), metalMat);
        spoke.position.set(Math.sin(ang) * 0.16, 0.06, Math.cos(ang) * 0.16);
        spoke.rotation.y = ang;
        cg.add(spoke);
      }

      const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.34, 0.09, 20), cushionMat);
      seat.scale.set(1.08, 1, 1.0);
      seat.position.y = 0.5;
      cg.add(seat);

      const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.66, 0.08), cushionMat);
      backrest.position.set(0, 0.88, 0.28);
      backrest.rotation.x = -0.08;
      cg.add(backrest);

      const backTrim = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.06, 0.09), accentMat);
      backTrim.position.set(0, 1.22, 0.3);
      cg.add(backTrim);

      const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.08), cushionMat);
      headrest.position.set(0, 1.33, 0.31);
      cg.add(headrest);

      [-0.34, 0.34].forEach(ax => {
        const armPost = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 0.04), metalMat);
        armPost.position.set(ax, 0.62, 0.06);
        cg.add(armPost);
        const armPad = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.04, 0.32), accentMat);
        armPad.position.set(ax, 0.74, 0.06);
        cg.add(armPad);
      });

      parentGroup.add(cg);
    }

    function buildSleekRobotMesh(accentColorHex, isStandby, isCEO = false) {
      const robotGroup = new THREE.Group();

      const pearlWhiteMat = new THREE.MeshStandardMaterial({
        color: isCEO ? 0xfef3c7 : 0xf8fafc,
        roughness: 0.18,
        metalness: 0.22
      });
      const darkJointMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.4,
        metalness: 0.65
      });
      const accentMat = new THREE.MeshStandardMaterial({
        color: accentColorHex,
        roughness: 0.25,
        metalness: 0.4
      });
      const glowMat = new THREE.MeshBasicMaterial({
        color: isStandby ? 0x475569 : accentColorHex
      });

      const hoverRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.32, 0.03, 12, 24),
        glowMat
      );
      hoverRing.rotation.x = Math.PI / 2;
      hoverRing.position.y = 0.06;
      robotGroup.add(hoverRing);

      [-0.14, 0.14].forEach(lx => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.34, 14), darkJointMat);
        leg.position.set(lx, 0.32, 0);
        robotGroup.add(leg);

        const foot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 12), pearlWhiteMat);
        foot.scale.set(1.0, 0.6, 1.35);
        foot.position.set(lx, 0.14, -0.04);
        robotGroup.add(foot);
      });

      const torsoLower = new THREE.Mesh(new THREE.SphereGeometry(0.31, 20, 16), pearlWhiteMat);
      torsoLower.scale.set(1.05, 0.85, 0.88);
      torsoLower.position.y = 0.66;
      robotGroup.add(torsoLower);

      const torsoUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.28, 0.48, 22), pearlWhiteMat);
      torsoUpper.scale.set(1.08, 1.0, 0.88);
      torsoUpper.position.y = 0.88;
      robotGroup.add(torsoUpper);

      const collar = new THREE.Mesh(
        new THREE.TorusGeometry(0.28, 0.055, 12, 24),
        accentMat
      );
      collar.rotation.x = Math.PI / 2;
      collar.scale.set(1.12, 0.88, 1.0);
      collar.position.y = 1.12;
      robotGroup.add(collar);

      const chestCore = new THREE.Mesh(new THREE.CircleGeometry(0.09, 20), glowMat);
      chestCore.position.set(0, 0.9, -0.32);
      chestCore.rotation.y = Math.PI;
      robotGroup.add(chestCore);

      const headGroup = new THREE.Group();
      headGroup.position.set(0, 1.48, 0);

      const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.36, 24, 20), pearlWhiteMat);
      helmet.scale.set(1.22, 0.95, 1.02);
      headGroup.add(helmet);

      const visorGlass = new THREE.Mesh(
        new THREE.SphereGeometry(0.33, 22, 18),
        new THREE.MeshStandardMaterial({ color: 0x050811, roughness: 0.08, metalness: 0.8 })
      );
      visorGlass.scale.set(1.14, 0.76, 0.65);
      visorGlass.position.set(0, 0.01, -0.16);
      headGroup.add(visorGlass);

      const eyeMat = new THREE.MeshBasicMaterial({
        color: isStandby ? 0x64748b : (isCEO ? 0xfbbf24 : 0x00f2fe)
      });
      const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.058, 12, 12), eyeMat);
      leftEye.scale.set(1.1, 1.35, 0.5);
      leftEye.position.set(-0.13, 0.03, -0.36);
      const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.058, 12, 12), eyeMat);
      rightEye.scale.set(1.1, 1.35, 0.5);
      rightEye.position.set(0.13, 0.03, -0.36);
      headGroup.add(leftEye, rightEye);

      [-0.43, 0.43].forEach(ex => {
        const earPod = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.08, 16), accentMat);
        earPod.rotation.z = Math.PI / 2;
        earPod.position.set(ex, 0.02, 0);
        headGroup.add(earPod);

        const earRing = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.09, 16), glowMat);
        earRing.rotation.z = Math.PI / 2;
        earRing.position.set(ex, 0.02, 0);
        headGroup.add(earRing);
      });

      if (isCEO) {
        const crown = new THREE.Mesh(
          new THREE.TorusGeometry(0.18, 0.035, 12, 24),
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
        );
        crown.rotation.x = Math.PI / 2;
        crown.position.set(0, 0.42, 0);
        headGroup.add(crown);
      } else {
        const antennaStem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.18, 10), darkJointMat);
        antennaStem.position.set(0, 0.38, 0);
        headGroup.add(antennaStem);
        const antennaBulb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), glowMat);
        antennaBulb.position.set(0, 0.49, 0);
        headGroup.add(antennaBulb);
      }

      robotGroup.add(headGroup);

      function createArm(side) {
        const armPivot = new THREE.Group();
        armPivot.position.set(side * 0.42, 1.04, -0.06);

        const shoulderBall = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 14), accentMat);
        armPivot.add(shoulderBall);

        const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.34, 14), pearlWhiteMat);
        forearm.position.set(0, -0.14, -0.14);
        forearm.rotation.x = Math.PI / 3.2;
        armPivot.add(forearm);

        const handBall = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 14), glowMat);
        handBall.position.set(0, -0.24, -0.28);
        armPivot.add(handBall);

        return armPivot;
      }

      const leftArm = createArm(-1);
      const rightArm = createArm(1);
      robotGroup.add(leftArm, rightArm);

      return {
        group: robotGroup,
        head: headGroup,
        leftArm,
        rightArm,
        eyeMat,
        glowMat,
        leftEye,
        rightEye
      };
    }

    function build3DAgentDeskAndRobot(ag) {
      const deskGroup = new THREE.Group();
      deskGroup.position.set(ag.deskPos.x, 0, ag.deskPos.z);

      const deskTopWood = new THREE.Mesh(
        new THREE.BoxGeometry(2.55, 0.09, 1.32),
        new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.45, metalness: 0.1 })
      );
      deskTopWood.position.y = 0.88;
      deskTopWood.castShadow = true;
      deskTopWood.receiveShadow = true;
      deskGroup.add(deskTopWood);

      const deskMatPad = new THREE.Mesh(
        new THREE.BoxGeometry(1.55, 0.015, 0.72),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 })
      );
      deskMatPad.position.set(-0.1, 0.93, 0.12);
      deskGroup.add(deskMatPad);

      const deskLedStrip = new THREE.Mesh(
        new THREE.BoxGeometry(2.56, 0.028, 0.03),
        new THREE.MeshBasicMaterial({ color: ag.status === 'STANDBY' ? 0x334155 : ag.colorHex })
      );
      deskLedStrip.position.set(0, 0.88, -0.66);
      deskGroup.add(deskLedStrip);

      const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 });
      [
        { x: -1.16, z: -0.54 },
        { x: 1.16, z: -0.54 },
        { x: -1.16, z: 0.54 },
        { x: 1.16, z: 0.54 }
      ].forEach(lp => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.03, 0.88, 12), legMat);
        leg.position.set(lp.x, 0.44, lp.z);
        deskGroup.add(leg);
      });

      const armStand = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.42, 12), legMat);
      armStand.position.set(-0.15, 1.12, -0.38);
      deskGroup.add(armStand);

      const codeTex = createCodeScreenTexture(ag.colorHex, ag.status === 'STANDBY');
      const monitorMat = new THREE.MeshBasicMaterial({ map: codeTex });

      const mainFrame = new THREE.Mesh(
        new THREE.BoxGeometry(1.18, 0.62, 0.045),
        new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.3, metalness: 0.6 })
      );
      mainFrame.position.set(-0.15, 1.34, -0.32);
      deskGroup.add(mainFrame);

      const mainScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 0.56), monitorMat);
      mainScreen.position.set(-0.15, 1.34, -0.295);
      deskGroup.add(mainScreen);

      const sideMonitorGroup = new THREE.Group();
      sideMonitorGroup.position.set(-0.92, 1.32, -0.18);
      sideMonitorGroup.rotation.y = 0.38;

      const sideFrame = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.68, 0.04),
        new THREE.MeshStandardMaterial({ color: 0x090d16 })
      );
      sideMonitorGroup.add(sideFrame);

      const sideScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.37, 0.62), monitorMat);
      sideScreen.position.z = 0.022;
      sideMonitorGroup.add(sideScreen);
      deskGroup.add(sideMonitorGroup);

      const kbBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.58, 0.03, 0.22),
        new THREE.MeshStandardMaterial({ color: 0x1e293b })
      );
      kbBase.position.set(-0.15, 0.95, 0.14);
      deskGroup.add(kbBase);

      const kbGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.54, 0.036, 0.18),
        new THREE.MeshBasicMaterial({ color: ag.status === 'STANDBY' ? 0x475569 : 0x00f2fe })
      );
      kbGlow.position.set(-0.15, 0.952, 0.14);
      deskGroup.add(kbGlow);

      const mouseMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 12, 10),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2 })
      );
      mouseMesh.scale.set(0.85, 0.5, 1.35);
      mouseMesh.position.set(0.28, 0.95, 0.14);
      deskGroup.add(mouseMesh);

      const pcCase = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.52, 0.56),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.6, roughness: 0.3 })
      );
      pcCase.position.set(0.95, 1.18, -0.18);
      deskGroup.add(pcCase);

      const pcRgbBar = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.42, 0.44),
        new THREE.MeshBasicMaterial({ color: ag.colorHex })
      );
      pcRgbBar.position.set(0.785, 1.18, -0.18);
      deskGroup.add(pcRgbBar);

      const mug = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.055, 0.14, 14),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc })
      );
      mug.position.set(0.54, 0.99, 0.24);
      deskGroup.add(mug);

      const miniPot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.075, 0.055, 0.12, 12),
        new THREE.MeshStandardMaterial({ color: 0xfde68a })
      );
      miniPot.position.set(-1.05, 0.98, 0.28);
      deskGroup.add(miniPot);

      const succulent = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.09, 0),
        new THREE.MeshStandardMaterial({ color: 0x10b981 })
      );
      succulent.position.set(-1.05, 1.08, 0.28);
      deskGroup.add(succulent);

      buildErgonomicChair(deskGroup, -0.1, 0.82, 0x0f172a, ag.colorHex);

      scene.add(deskGroup);

      const builtRobot = buildSleekRobotMesh(ag.colorHex, ag.status === 'STANDBY', false);
      const homePos = new THREE.Vector3(ag.deskPos.x - 0.1, 0, ag.deskPos.z + 0.78);
      builtRobot.group.position.copy(homePos);
      scene.add(builtRobot.group);

      robotMeshes[ag.id] = {
        agentId: ag.id,
        group: builtRobot.group,
        head: builtRobot.head,
        leftArm: builtRobot.leftArm,
        rightArm: builtRobot.rightArm,
        eyeMat: builtRobot.eyeMat,
        glowMat: builtRobot.glowMat,
        leftEye: builtRobot.leftEye,
        rightEye: builtRobot.rightEye,
        deskLedStrip,
        kbGlow,
        homePos,
        targetPos: homePos.clone(),
        motionState: 'AT_DESK',
        dwellTimer: 0
      };
    }

    function sendRobotToPosition(agentId, destX, destZ, dwellFrames = 140) {
      const rm = robotMeshes[agentId];
      if (!rm) return;
      rm.targetPos.set(destX, 0, destZ);
      rm.motionState = 'WALKING_TO_TARGET';
      rm.dwellTimer = dwellFrames;
    }

    function animate3DOffice(timestamp) {
      requestAnimationFrame(animate3DOffice);
      if (officeState.viewMode !== '3D' || !renderer || !scene || !camera) return;

      updateCameraFromSpherical();
      const t = (timestamp || 0) * 0.006;

      if (hologramRingMesh) {
        hologramRingMesh.rotation.y = t * 0.45;
        hologramRingMesh.rotation.x = Math.sin(t * 0.3) * 0.25;
      }

      // Xoay nhẹ các vòng quỹ đạo năng lượng 3D phía sau màn hình Hologram trong suốt
      if (backHoloOrbitsGroup) {
        backHoloOrbitsGroup.rotation.z = t * 0.08;
        backHoloOrbitsGroup.rotation.y = Math.sin(t * 0.15) * 0.22;
      }

      agents.forEach(ag => {
        const rm = robotMeshes[ag.id];
        if (!rm) return;

        if (ag.status === 'BUG_FIX') {
          rm.eyeMat.color.setHex(0xf43f5e);
          rm.glowMat.color.setHex(0xf43f5e);
          rm.deskLedStrip.material.color.setHex(0xf43f5e);
        } else if (ag.status === 'WORKING') {
          rm.eyeMat.color.setHex(0x00f2fe);
          rm.glowMat.color.setHex(ag.colorHex);
          rm.deskLedStrip.material.color.setHex(ag.colorHex);
        } else if (ag.status === 'REPORTING') {
          rm.eyeMat.color.setHex(0xfbbf24);
          rm.glowMat.color.setHex(0xf59e0b);
          rm.deskLedStrip.material.color.setHex(0xf59e0b);
        } else {
          rm.eyeMat.color.setHex(0x64748b);
          rm.glowMat.color.setHex(0x334155);
          rm.deskLedStrip.material.color.setHex(0x1e293b);
        }

        const blinkCycle = Math.sin(t * 0.7 + ag.id * 1.7);
        const eyeScaleY = blinkCycle > 0.96 ? 0.15 : 1.35;
        rm.leftEye.scale.y = eyeScaleY;
        rm.rightEye.scale.y = eyeScaleY;

        if (rm.motionState === 'WALKING_TO_TARGET') {
          const dir = new THREE.Vector3().subVectors(rm.targetPos, rm.group.position);
          if (dir.length() > 0.16) {
            dir.normalize();
            rm.group.position.addScaledVector(dir, 0.13);
            const angle = Math.atan2(dir.x, dir.z) + Math.PI;
            rm.group.rotation.y = angle;
            rm.group.position.y = Math.abs(Math.sin(t * 2.4)) * 0.14;
            rm.leftArm.rotation.x = Math.sin(t * 2.4) * 0.35;
            rm.rightArm.rotation.x = -Math.sin(t * 2.4) * 0.35;
          } else {
            rm.group.position.y = 0;
            rm.leftArm.rotation.x = 0;
            rm.rightArm.rotation.x = 0;
            rm.motionState = 'AT_TARGET';
          }
        } else if (rm.motionState === 'AT_TARGET') {
          rm.dwellTimer -= 1;
          rm.head.rotation.y = Math.sin(t * 0.9) * 0.28;
          if (rm.dwellTimer <= 0) rm.motionState = 'WALKING_HOME';
        } else if (rm.motionState === 'WALKING_HOME') {
          const dir = new THREE.Vector3().subVectors(rm.homePos, rm.group.position);
          if (dir.length() > 0.16) {
            dir.normalize();
            rm.group.position.addScaledVector(dir, 0.13);
            const angle = Math.atan2(dir.x, dir.z) + Math.PI;
            rm.group.rotation.y = angle;
            rm.group.position.y = Math.abs(Math.sin(t * 2.4)) * 0.14;
          } else {
            rm.group.position.copy(rm.homePos);
            rm.group.rotation.set(0, 0, 0);
            rm.motionState = 'AT_DESK';
          }
        } else {
          if (ag.status !== 'STANDBY') {
            // ĐANG LÀM VIỆC: Nhún nhảy gõ phím tốc độ cao, đèn bàn nhấp nháy sáng rực nhìn thấy rõ từ xa!
            rm.group.rotation.y = Math.sin(t * 1.5 + ag.id) * 0.08;
            rm.group.rotation.x = 0.08 + Math.sin(t * 6.0 + ag.id) * 0.04;
            rm.group.position.y = Math.abs(Math.sin(t * 4.5 + ag.id)) * 0.09;
            rm.head.rotation.x = 0;
            rm.leftArm.rotation.x = Math.sin(t * 8.0 + ag.id) * 0.45;
            rm.rightArm.rotation.x = Math.cos(t * 8.0 + ag.id) * 0.45;
            rm.head.rotation.y = Math.sin(t * 1.6 + ag.id) * 0.28;
            // Đèn bàn & bàn phím nhấp nháy năng lượng khi đang làm
            const pulseOn = Math.floor(Date.now() / 320) % 2 === 0;
            rm.deskLedStrip.material.color.setHex(pulseOn ? 0x00f2fe : (ag.status === 'BUG_FIX' ? 0xf43f5e : 0x10b981));
            rm.kbGlow.material.color.setHex(pulseOn ? 0x34d399 : 0x00f2fe);
          } else {
            // ĐANG RẢNH (STANDBY): Nhìn từ phía sau cũng thấy rõ ràng 100%!
            if (ag.id % 2 === 0) {
              // Nhóm chẵn: Ngả hẳn người ra sau ghế ngủ gật (nghiêng đầu và thân ra sau, nhịp thở lên xuống)
              rm.group.rotation.x = -0.42 + Math.sin(t * 0.8 + ag.id) * 0.06;
              rm.group.rotation.y = 0.25;
              rm.group.position.y = 0;
              rm.head.rotation.z = 0.32;
              rm.leftArm.rotation.x = 0.4;
              rm.rightArm.rotation.x = 0.4;
            } else {
              // Nhóm lẻ: Xoay tròn 360 độ trên ghế công thái học & giơ 2 tay quẩy nhạc / chơi game!
              rm.group.rotation.x = 0;
              rm.group.rotation.y = (t * 0.85 + ag.id) % (Math.PI * 2);
              rm.group.position.y = Math.abs(Math.sin(t * 2.2 + ag.id)) * 0.06;
              rm.head.rotation.z = Math.sin(t * 2.5 + ag.id) * 0.22;
              rm.leftArm.rotation.x = -0.85 + Math.sin(t * 3.5 + ag.id) * 0.35;
              rm.rightArm.rotation.x = -0.85 - Math.sin(t * 3.5 + ag.id) * 0.35;
            }
          }
        }
      });

      renderer.render(scene, camera);
      update3DFloatingLabels();
    }

    function onResize3DOffice() {
      const wrapper = document.getElementById('threeCanvasWrapper');
      if (!wrapper || !renderer || !camera) return;
      const w = Math.max(320, wrapper.clientWidth || window.innerWidth);
      const h = Math.max(240, wrapper.clientHeight || (window.innerHeight - 48));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const labelScale = Math.max(0.62, Math.min(1.05, w / 1360));
      document.documentElement.style.setProperty('--holo-label-scale', labelScale.toFixed(3));
    }

    function update3DFloatingLabels() {
 const overlay=document.getElementById('threeLabelsOverlay'),wrapper=document.getElementById('threeCanvasWrapper');
 if(!camera||!overlay)return;
 for(const a of agents){let el=document.getElementById('robot-'+a.id);if(!el){el=document.createElement('button');el.id='robot-'+a.id;el.className='robot-label-anchor';el.onclick=()=>openAgentDeskModal(a.id);overlay.append(el)}
 el.textContent=a.shortName+' · '+a.statusText;el.dataset.busy=a.status!=='STANDBY';const p=robotMeshes[a.id].group.position.clone();p.y+=2;projectToOverlay(el.id,p,wrapper.clientWidth,wrapper.clientHeight);}
    }
    function projectToOverlay(domId, vec3, width, height) {
      const el = document.getElementById(domId);
      if (!el) return;
      const v = vec3.clone().project(camera);
      if (v.z > 1) {
        el.style.opacity = '0';
        return;
      }
      const x = (v.x * 0.5 + 0.5) * width;
      const y = (-(v.y * 0.5) + 0.5) * height;
      el.style.opacity = '1';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    }


function drawGiant3DScreenCanvas(){
 if(!giantScreenCtx)return;const c=giantScreenCtx;c.clearRect(0,0,2560,1120);c.fillStyle='rgba(3,15,33,.96)';c.fillRect(0,0,2560,1120);c.strokeStyle='#2ee6e6';c.lineWidth=5;c.strokeRect(6,6,2548,1108);
 c.fillStyle='#66f7ff';c.font='bold 52px Arial';c.fillText('VĂN PHÒNG AI • THỰC THI & BẰNG CHỨNG',60,90);
 const j=window.currentJob;c.fillStyle='#fff';c.font='30px Arial';c.fillText(j?j.brief.slice(0,110):'Chưa có dự án. Mở bảng giao việc để bắt đầu.',60,155);
 c.fillStyle='#f9cc66';c.fillText(j?(window.statusNames[j.status]||j.status):'Sẵn sàng',60,215);
 agents.forEach((a,i)=>{let y=300+i*65;c.fillStyle=a.status==='STANDBY'?'#718aa3':'#5af8d6';c.font='bold 28px Arial';c.fillText(a.shortName,60,y);c.font='25px Arial';c.fillText(a.currentTask.slice(0,67),270,y);});
 c.fillStyle='#b9d5f2';c.font='32px Arial';c.fillText('KIỂM THỬ TRÊN TRÌNH DUYỆT',1550,300);
 const rr=j?.report;const n=rr?.tests.length||0,p=rr?.tests.filter(t=>t.status==='passed').length||0;c.font='bold 70px Arial';c.fillStyle='#61ecd4';c.fillText(rr?p+' / '+n:'CHƯA CHẠY',1550,410);
 c.font='28px Arial';c.fillStyle='#b9d5f2';c.fillText('Vòng: '+(j?.round||0)+' • API: '+(j?.calls||0),1550,490);c.fillText('Token được API báo: '+(j?.tokens||0),1550,545);c.fillText('Chi phí: chưa có dữ liệu hóa đơn',1550,600);
 c.fillText('Mã phiên bản: '+(j?.sourceHash?.slice(0,12)||'chưa tạo'),1550,675);c.fillText('Nhân sự dự bị: chưa được triển khai',1550,760);
 c.font='25px Arial';c.fillStyle='#91a6bc';c.fillText('Kết quả chỉ áp dụng cho các bài thử đã chạy.',1550,850);c.fillText('Không tự tăng điểm hoặc bù tiến độ offline.',1550,900);giantScreenTexture.needsUpdate=true;
}
function openAgentDeskModal(id){window.showPanel();document.getElementById('notice').textContent=agents.find(a=>a.id===id)?.currentTask||'';}
function openCEOCommandDrawer(){window.showPanel()}
function toggleZoomCommandWall(){window.showPanel()}
function trigger3DMeetingRoom(){window.showPanel()}
try{initThreeJSOffice()}catch(e){document.getElementById('sceneWarning').textContent='Không mở được 3D. Bảng điều hành vẫn sử dụng được.'}
