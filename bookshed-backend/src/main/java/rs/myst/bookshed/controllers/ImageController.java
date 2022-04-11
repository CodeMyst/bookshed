package rs.myst.bookshed.controllers;

import java.io.IOException;
import java.nio.file.Path;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/image")
public class ImageController {
    private final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @PostMapping("/")
    public ResponseEntity<?> uploadImage(@RequestParam MultipartFile file, HttpServletRequest req) {
        // random ID
        String uniqueID = UUID.randomUUID().toString();

        // get the uploaded file extension
        int dot = file.getOriginalFilename().lastIndexOf('.');
        if (dot < 0) return ResponseEntity.badRequest().build();
        String extension = file.getOriginalFilename().substring(dot + 1);

        try {
            // copy data to actual file on disk
            file.transferTo(Path.of("src/main/resources/static/images/" + uniqueID + "." + extension));
        } catch (IllegalStateException | IOException e) {
            logger.error(e.toString());
            return ResponseEntity.internalServerError().build();
        }

        class ImageResponse {
            private String filename;

            ImageResponse(String filename) {
                this.setFilename(filename);
            }

            public String getFilename() {
                return filename;
            }

            public void setFilename(String filename) {
                this.filename = filename;
            }
        }

        ImageResponse res = new ImageResponse(uniqueID + "." + extension);

        return ResponseEntity.ok(res);
    }
}
