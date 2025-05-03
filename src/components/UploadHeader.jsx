// src/components/UploadHeader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI 컴포넌트 및 아이콘
import HomeIcon from "@mui/icons-material/Home";
import { Box, IconButton, Typography, Divider } from "@mui/material";

function UploadHeader() {
  const navigate = useNavigate();

  return (
    <>
      {/* 상단 영역: 홈 버튼 + 타이틀 */}
      <Box display="flex" alignItems="center" px={2} py={1}>
        {/* 🏠 홈 아이콘 클릭 시 메인 페이지("/")로 이동 */}
        <IconButton onClick={() => navigate("/")}>
          <HomeIcon fontSize="medium" color="primary" />
        </IconButton>

        {/* 페이지 제목 */}
        <Typography variant="h6" ml={1}>
          문제 업로드
        </Typography>
      </Box>

      {/* 구분선 */}
      <Divider />
    </>
  );
}

export default UploadHeader;
